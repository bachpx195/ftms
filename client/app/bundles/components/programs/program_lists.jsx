import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import FormEdit from './form_edit';
import FormCreate from './form_create';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import * as program_constants from './program_constants';

const PROGRAM_URL = app_constants.APP_NAME + program_constants.PROGRAM_PATH;

export default class ProgramLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: null,
      programs: props.programs,
      program: null,
      organization: props.organization,
      not_assigned_programs: props.not_assigned_programs
    }
  }

  render() {
    const ButtonAssignProgram = () => (
      <button className="btn btn-info"
        onClick={this.handleAssignProgram.bind(this)}>
        {I18n.t('buttons.assign_program')}
      </button>
    )

    const NewLayout = ({Table, Pagination, Filter}) => (
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">
            <ButtonAssignProgram />
          </div>
          <div className="clearfix"></div>
          <div className="griddle-head clearfix">
            <div className="col-md-6">
              <Filter />
            </div>
            <div className="col-md-6 text-right">
              <Pagination />
            </div>
          </div>
          <div className="col-md-12">
            <Table />
          </div>
        </div>
      </div>
    );

    const ButtonEdit = ({griddleKey}) => (
      <button className="btn btn-info" data-index={griddleKey}
        onClick={this.handleEdit.bind(this)}>
        {I18n.t('buttons.edit')}
      </button>
    );

    const ButtonDelete = ({griddleKey}) => (
      <button className="btn btn-danger" data-index={griddleKey}
        onClick={this.handleDelete.bind(this)}>
        {I18n.t('buttons.delete')}
      </button>
    );

    const ButtonSubProgram = ({griddleKey}) => (
      <button className="btn btn-info" data-index={griddleKey}
        onClick={this.handleCreateSubProgram.bind(this)}>
        {I18n.t('buttons.create_sub_program')}
      </button>
    );

    const ButtonUnassign = ({griddleKey}) => (
      <button className="btn btn-warning" data-index={griddleKey}
        onClick={this.handleUnassignProgram.bind(this)}>
        {I18n.t('buttons.unassign')}
      </button>
    );

    const LinkToProgram = ({value, griddleKey}) => {
      let program = this.state.programs[griddleKey];
      let link = '#';
      if(program.organization) {
        link = PROGRAM_URL + '/' + program.organization.id +
          '/programs/' + program.id;
      }
      return <a href={link}>{value}</a>;
    };

    const LinkToOrganization = ({griddleKey}) => {
      let organization = this.state.programs[griddleKey].organization;
      let link = '#';
      if(organization) {
        link = PROGRAM_URL + '/' + organization.id + '/programs/';
        return <a href={link}>{organization.name}</a>;
      }
      return null;
    };

    const LinkToParentProgram = ({griddleKey}) => {
      let program = this.state.programs[griddleKey].parent;
      if(program) {
        let link = '#';
        if(program.organization) {
          link = PROGRAM_URL + '/' + program.organization.id +
            '/programs/' + program.id;
        }
        return <a href={link}>{program.name}</a>;
      } else {
        return null;
      }
    };

    return (
      <div>
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
        {this.renderModal()}
        {this.renderModalAssignProgram()}
      </div>
    );
  }

  renderModal() {
    let modalEdit = null;
    const url = PROGRAM_URL + "/" + this.state.organization.id + "/programs";
    let title = this.state.parent ? this.state.parent.name : I18n.t("programs.edit");
    let form = null;
    if(this.state.parent) {
      form = <FormCreate parent={this.state.parent} url={url}
        handleAfterSaved={this.handleAfterCreated.bind(this)} />;
    } else {
      form = <FormEdit program={this.state.program} url={url}
        handleAfterSaved={this.handleAfterUpdated.bind(this)} />
    }

    return (<div id="modalEdit" className="modal fade in" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close"
              data-dismiss="modal">&times;</button>
            <h4 className="modal-title">{title}</h4>
          </div>
          <div className="modal-body">
            {form}
          </div>
        </div>
      </div>
    </div>);
  }

  renderModalAssignProgram() {
    let options = this.state.not_assigned_programs.map(program => {
      return <li key={program.id} className="list-group-item">
        <input type="checkbox" name="program" value={program.id}/> {program.name}
      </li>;
    });

    return (<div id="modalAssign" className="modal fade in" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close"
              data-dismiss="modal">&times;</button>
            <h4 className="modal-title">{I18n.t('buttons.assign_program')}</h4>
          </div>
          <div className="modal-body">
            <form onSubmit={this.handleSubmitAssign.bind(this)}>
              <ul className="list-group checked-list-box">
                {options}
              </ul>
              <div className="text-right">
                <button className="btn btn-primary">
                  {I18n.t('buttons.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>);
  }

  componentDidMount() {
    $(document).on('click', '.list-group-item', function(){
      let $checkbox = $(this).find('input[type="checkbox"]');
      let checked = $checkbox.is(':checked');
      $checkbox.prop('checked', !checked);
      if(checked) {
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

  handleEdit(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      parent: null,
      program: this.props.programs[$target.data('index')]
    });
    $("#modalEdit").modal();
  }

  handleCreateSubProgram(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      parent: this.props.programs[$target.data('index')],
      program: null
    });
    $("#modalEdit").modal();
  }

  handleAfterCreated(new_program) {
    this.props.handleAfterCreated(new_program);
  }

  handleAfterUpdated(new_program) {
    this.props.handleAfterUpdated(new_program);
  }

  handleDelete(event) {
    let $target = $(event.target);
    $target.blur();
    let program = this.props.programs[$target.data('index')];
    if (confirm(I18n.t("data.confirm_delete"))) {
      const url = PROGRAM_URL + '/' + this.state.organization.id + '/programs';
      axios.delete(url + '/' + program.id, {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
        .then(response => {
          this.props.handleAfterDeleted(program);
        })
        .catch(error => console.log(error));
    }
  }

  handleAssignProgram() {
    $('#modalAssign').modal();
  }

  handleSubmitAssign(event) {
    event.preventDefault();
    let program_ids = [];
    $('input:checked', $(event.target))
      .each((index, program) => program_ids[index] = parseInt($(program).val()));
    let url = app_constants.APP_NAME + program_constants.ASSIGN_PROGRAM_PATH + '.json';
    axios.post(url, {
      id: this.props.organization.id,
      'program_ids': program_ids,
      authenticity_token: ReactOnRails.authenticityToken()
    })
      .then(response => {
        $('#modalAssign').modal('hide');
        this.props.handleAfterAssignProgram(program_ids);
      })
      .catch(error => console.log(error));
  }

  handleUnassignProgram(event) {
    let $target = $(event.target);
    $target.blur();
    let program = this.state.programs[$target.data('index')];
    if(confirm(I18n.t('data.confirm_unassign'))) {
      let url = app_constants.APP_NAME + program_constants.ASSIGN_PROGRAM_PATH +
        '/' + this.props.organization.id + '.json';
      axios.delete(url, {
        params: {
          program_id: program.id,
          authenticity_token: ReactOnRails.authenticityToken()
        }
      })
        .then(response => {
          this.props.handleAfterUnassignProgram(program.id);
        })
        .catch(error => console.log(error));
    }
  }
}
