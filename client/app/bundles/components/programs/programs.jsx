import Destroy from './actions/destroy';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import ModalCreateSubProgram from './templates/modal_create_sub_program';
import ModalAssignProgram from './templates/modal_assign_program';
import React from 'react';
import UnAssign from './actions/unassign';
import { NewLayout } from '../shareds/griddles/new_layout';
import * as table_constants from 'constants/griddle_table_constants';
import * as routes from 'config/routes';
import ProgramPolicy from 'policy/program_policy';
import Row from './griddle/row';

export default class ProgramLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: '',
      programs: props.programs,
      program: '',
      organization: props.organization,
      not_assigned_programs: props.not_assigned_programs
    }
    Row.prototype.programs = props.programs;
    Row.prototype.organization = props.organization;
  }

  componentDidMount() {
    $(document).on('click', '.list-group-item', function() {
      let $checkbox = $(this).find('input[type="checkbox"]');
      let checked = $checkbox.is(':checked');
      $checkbox.prop('checked', !checked);
      if (checked) {
        $(this).removeClass('active');
      } else {
        $(this).addClass('active');
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    Row.prototype.programs = nextProps.programs;
    Row.prototype.organization = nextProps.organization;
    this.setState({
      programs: nextProps.programs,
      organization: nextProps.organization,
      not_assigned_programs: nextProps.not_assigned_programs
    });
  }

  render() {
    {NewLayout}
    const ButtonEdit = ({griddleKey}) => {
      let program = this.state.programs[griddleKey];
      let organization = this.state.organization;
      return (
        <ProgramPolicy permit={[
          {action: ['ownerById'], data: {id: program.owner_id}},
          {action: ['update', 'creatorByIds'], data: [program.creator_id, organization.creator_id]},
          {action: ['update', 'belongById'], data: {key: 'program_id', id: program.id}},
        ]}>
          <button className="btn btn-info" data-index={griddleKey}
            onClick={this.handleEdit.bind(this)}>
            {I18n.t('buttons.edit')}
          </button>
        </ProgramPolicy>
    )};

    const ButtonDelete = ({griddleKey}) => {
      let program = this.state.programs[griddleKey];
      let organization = this.state.organization;
      return (
        <ProgramPolicy permit={[
          {action: ['ownerById'], data: {id: program.owner_id}},
          {action: ['destroy', 'creatorByIds'], data: [program.creator_id, organization.creator_id]},
          {action: ['destroy', 'belongById'], data: {key: 'program_id', id: program.id}},
        ]}>
          <Destroy
            url={routes.program_url(program.id)}
            program={program}
            handleAfterDeleted={this.props.handleAfterDeleted}
          />
        </ProgramPolicy>
    )}

    const ButtonSubProgram = ({griddleKey}) => (
      <ProgramPolicy permit={[
        {action: ['create']}
      ]}>
        <button className="btn btn-info" data-index={griddleKey}
          onClick={this.handleCreateSubProgram.bind(this)}>
          {I18n.t('buttons.create_sub_program')}
        </button>
      </ProgramPolicy>
    );

    const ButtonUnassign = ({griddleKey}) => {
      let program = this.state.programs[griddleKey];
      let organization = this.state.organization;
      let url = routes.assign_program_url(this.state.organization.id) + '.json';
      return (
        <ProgramPolicy permit={[
          {action: ['ownerById'], data: {id: program.owner_id}},
          {action: ['update', 'creatorByIds'], data: [program.creator_id, organization.creator_id]},
          {action: ['update', 'belongById'], data: {key: 'program_id', id: program.id}},
        ]}>
          <UnAssign
            url={url}
            program={program}
            organization={this.state.organization}
            handleAfterUnassignProgram={this.props.handleAfterUnassignProgram}
          />
        </ProgramPolicy>
    )};

    const LinkToProgram = ({value, griddleKey}) => {
      let program = this.state.programs[griddleKey];
      let program_url = '#';
      if (program.organization) {
        program_url = routes.program_url(program.id);
      }
      return <a href={program_url}>{value}</a>;
    };

    const LinkToOrganization = ({griddleKey}) => {
      let organization = this.state.programs[griddleKey].organization;
      let organization_url = '#';
      if (organization) {
        organization_url = routes.organization_programs_url(organization.id);
        return <a href={organization_url}>{organization.name}</a>;
      }
      return null;
    };

    const LinkToParentProgram = ({griddleKey}) => {
      let program = this.state.programs[griddleKey].parent;
      if (program) {
        let program_url = '#';
        if (program.organization) {
          program_url = routes.program_url(program.id);
        }
        return <a href={program_url}>{program.name}</a>;
      } else {
        return null;
      }
    };

    let programs_url = routes.organization_programs_url(this.state.organization.id);

    return (
      <div>
        <div className="col-md-12">
          <button className="btn btn-info hidden"
            onClick={this.handleAssignProgram.bind(this)}>
            {I18n.t('buttons.assign_program')}
          </button>
        </div>
        <Griddle data={this.state.programs} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout, Row: Row}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id="name" title={I18n.t("programs.name")}
              customComponent={LinkToProgram} />
            <ColumnDefinition id="parent_name" title={I18n.t("programs.parent")}
              customComponent={LinkToParentProgram} />
            <ColumnDefinition id="assigned_to_organization"
              title={I18n.t("programs.assigned_to_organization")}
              customComponent={LinkToOrganization} />
            <ColumnDefinition id="sub_program" customComponent={ButtonSubProgram}
              title={I18n.t("programs.sub_program")} />
            <ColumnDefinition id="edit" customComponent={ButtonEdit}
              title={I18n.t("programs.edit")} />
            <ColumnDefinition id="delete" customComponent={ButtonDelete}
              title={I18n.t("programs.delete")} />
            <ColumnDefinition id="unassign" customComponent={ButtonUnassign}
              title={I18n.t("programs.unassign")} />
          </RowDefinition>
        </Griddle>
        <ModalCreateSubProgram
          url={programs_url}
          parent={this.state.parent}
          program={this.state.program}
          organization={this.state.organization}
          handleAfterUpdated={this.props.handleAfterUpdated}
          handleAfterCreated={this.props.handleAfterCreated}
        />
        <ModalAssignProgram
          url={routes.assign_programs_url()}
          organization={this.state.organization}
          not_assigned_programs={this.state.not_assigned_programs}
          handleAfterAssignProgram={this.props.handleAfterAssignProgram}
        />
      </div>
    );
  }

  handleEdit(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      parent: '',
      program: this.props.programs[$target.data('index')]
    });
    $(".modalEdit").modal();
  }

  handleCreateSubProgram(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      parent: this.props.programs[$target.data('index')],
      program: ''
    });
    $(".modalEdit").modal();
  }

  handleAssignProgram() {
    $('#modalAssign').modal();
  }
}
