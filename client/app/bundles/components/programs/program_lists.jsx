import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import FormEdit from './form_edit';
import FormCreate from './form_create';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import * as program_constants from './program_constants';

const PROGRAM_URL = app_constants.APP_NAME + program_constants.ADMIN_PROGRAM_PATH;

export default class ProgramLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: null,
      programs: props.programs,
      program: null,
      organization: props.organization,
    }
  }

  render() {
    const NewLayout = ({Table, Pagination, Filter}) => (
      <div className="col-md-12">
        <div className="row">
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
        {I18n.t("buttons.edit")}
      </button>
    );

    const ButtonDelete = ({griddleKey}) => (
      <button className="btn btn-danger" data-index={griddleKey}
        onClick={this.handleDelete.bind(this)}>
        {I18n.t("buttons.delete")}
      </button>
    );

    const ButtonSubProgram = ({griddleKey}) => (
      <button className="btn btn-info" data-index={griddleKey}
        onClick={this.handleCreateSubProgram.bind(this)}>
        {I18n.t("buttons.create_sub_program")}
      </button>
    );


    let modalEdit = null;
    const url = PROGRAM_URL + "/" + this.state.organization.id + "/programs";
    if (this.state.program) {
      modalEdit = (
        <div id="modalEdit" className="modal fade in" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close"
                  data-dismiss="modal">&times;</button>
                <h4 className="modal-title">{I18n.t("programs.edit")}</h4>
              </div>
              <div className="modal-body">
                <FormEdit
                  program={this.state.program}
                  url={url}
                  handleAfterEdited={this.handleAfterUpdated.bind(this)} />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      if (this.state.parent) {
        modalEdit = (
          <div id="modalEdit" className="modal fade in" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">

                <div className="modal-header">
                  <button type="button" className="close"
                    data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">{this.state.parent.name}</h4>
                </div>

                <div className="modal-body">
                  <FormCreate
                    parent={this.state.parent}
                    url={url}
                    handleAfterSaved={this.handleAfterUpdated.bind(this)} />
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div>
        <Griddle data={this.state.programs} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id="id" title={I18n.t("programs.id")} />
            <ColumnDefinition id="name" title={I18n.t("programs.name")} />
            <ColumnDefinition id="parent_name"
              title={I18n.t("programs.parent")} />
            <ColumnDefinition id="SubProgram" customComponent={ButtonSubProgram}
              title={I18n.t("programs.sub_program")} />
            <ColumnDefinition id="edit" customComponent={ButtonEdit}
              title={I18n.t("programs.edit")} />
            <ColumnDefinition id="delete" customComponent={ButtonDelete}
              title={I18n.t("programs.delete")} />
          </RowDefinition>
        </Griddle>
        {modalEdit}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      programs: nextProps.programs,
      organization: nextProps.organization,
      program: null,
      parent: null
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.program || this.state.parent) {
      $("#modalEdit").modal();
    }
  }

  handleEdit(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      parent: null,
      program: this.props.programs[$target.data('index')]
    });
  }

  handleCreateSubProgram(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      parent: this.props.programs[$target.data('index')],
      program: null
    });
  }

  handleAfterUpdated(new_program) {
    this.setState({
      program: null,
      parent: null
    });
    this.props.handleAfterUpdated(new_program);
  }

  handleDelete(event) {
    const url = PROGRAM_URL + "/" + this.state.organization.id + "/programs";

    let $target = $(event.target);
    $target.blur();
    let program = this.props.programs[$target.data('index')];
    if (confirm(I18n.t("data.confirm_delete"))) {
      axios.delete(url + "/" + program.id, {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
        .then(response => {
          this.fetchPrograms();
        })
        .catch(error => console.log(error));
    }
  }


  fetchPrograms() {
    const url = PROGRAM_URL + "/" + this.state.organization.id + "/programs";
    axios.get(url + ".json")
      .then(response => {
        this.setState({programs: response.data.programs});
        this.props.handleAfterDeleted(this.state.programs);
      })
      .catch(error => {
        console.log(error)
      });
  }
}
