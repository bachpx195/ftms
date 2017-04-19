import Destroy from './actions/destroy';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import ModalCreateSubProgram from './templates/modal_create_sub_program';
import ModalAssignProgram from './templates/modal_assign_program';
import React from 'react';
import UnAssign from './actions/unassign';
import { NewLayout } from '../shareds/griddles/new_layout';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import * as program_constants from './constants/program_constants';

const ASSIGN_PROGRAM_URL = app_constants.APP_NAME + program_constants.ASSIGN_PROGRAM_PATH;
const ORGANIZATION_URL = app_constants.APP_NAME + program_constants.ORGANIZATION_PATH;
const PROGRAM_PATH = program_constants.PROGRAMS_PATH;

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
    this.setState({
      programs: nextProps.programs,
      organization: nextProps.organization,
      not_assigned_programs: nextProps.not_assigned_programs
    });
  }

  render() {
    {NewLayout}
    const ButtonEdit = ({griddleKey}) => (
      <button className="btn btn-info" data-index={griddleKey}
        onClick={this.handleEdit.bind(this)}>
        {I18n.t('buttons.edit')}
      </button>
    );

    const ButtonDelete = ({griddleKey}) => {
      let program = this.props.programs[griddleKey];
      let url = ORGANIZATION_URL + '/' + this.state.organization.id + '/' +
        PROGRAM_PATH + program.id;
      return <Destroy
        url={url}
        program={program}
        handleAfterDeleted={this.props.handleAfterDeleted}
      />
    }

    const ButtonSubProgram = ({griddleKey}) => (
      <button className="btn btn-info" data-index={griddleKey}
        onClick={this.handleCreateSubProgram.bind(this)}>
        {I18n.t('buttons.create_sub_program')}
      </button>
    );

    const ButtonUnassign = ({griddleKey}) => {
      let program = this.state.programs[griddleKey];
      let url = app_constants.APP_NAME + program_constants.ASSIGN_PROGRAM_PATH +
        '/' + this.state.organization.id + '.json';
      return <UnAssign
        url={url}
        program={program}
        organization={this.state.organization}
        handleAfterUnassignProgram={this.props.handleAfterUnassignProgram}
      />
    };

    const LinkToProgram = ({value, griddleKey}) => {
      let program = this.state.programs[griddleKey];
      let link = '#';
      if (program.organization) {
        link = ORGANIZATION_URL + '/' + program.organization.id +
          '/programs/' + program.id;
      }
      return <a href={link}>{value}</a>;
    };

    const LinkToOrganization = ({griddleKey}) => {
      let organization = this.state.programs[griddleKey].organization;
      let link = '#';
      if (organization) {
        link = ORGANIZATION_URL + '/' + organization.id + '/programs/';
        return <a href={link}>{organization.name}</a>;
      }
      return null;
    };

    const LinkToParentProgram = ({griddleKey}) => {
      let program = this.state.programs[griddleKey].parent;
      if (program) {
        let link = '#';
        if (program.organization) {
          link = ORGANIZATION_URL + '/' + program.organization.id +
            '/programs/' + program.id;
        }
        return <a href={link}>{program.name}</a>;
      } else {
        return null;
      }
    };

    let url = ORGANIZATION_URL + "/" + this.state.organization.id + "/" + PROGRAM_PATH;

    return (
      <div>
        <div className="col-md-12">
          <button className="btn btn-info"
            onClick={this.handleAssignProgram.bind(this)}>
            {I18n.t('buttons.assign_program')}
          </button>
        </div>
        <Griddle data={this.state.programs} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
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
          url={url}
          parent={this.state.parent}
          program={this.state.program}
          organization={this.state.organization}
          handleAfterUpdated={this.props.handleAfterUpdated}
          handleAfterCreated={this.props.handleAfterCreated}
        />
        <ModalAssignProgram
          url={ASSIGN_PROGRAM_URL}
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
