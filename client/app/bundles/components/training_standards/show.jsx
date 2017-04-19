import * as app_constants from 'constants/app_constants';
import * as table_constants from 'constants/griddle_table_constants';
import * as training_standard_constants from './constants/training_standard_constants';
import axios from 'axios';
import Form from './templates/form';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import ModalAssign from './templates/modal_assign';
import ModalEvaluation from './templates/modal_evaluation'
import ModalShareTrainingStandard from './templates/modal_share_training_standard';
import React from 'react';

const TRAINING_STANDARD_URL = app_constants.APP_NAME + training_standard_constants.TRAINING_STANDARD_PATH;
const STANDARD_SUBJECTS_URL = app_constants.APP_NAME + training_standard_constants.STANDARD_SUBECTS_PATH;
const SUBJECT_URL = app_constants.APP_NAME + training_standard_constants.SUBJECT_PATH;
const SHARE_WITH_URL = app_constants.APP_NAME + training_standard_constants.SHARE_WITH_PATH;

export default class TrainingStandardShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluation_standards: [],
      evaluation_template: {},
      showForm: '',
      training_standard: props.training_standard,
      selected_subjects: props.selected_subjects,
      remain_subjects: props.remain_subjects,
      selected_organizations: props.selected_organizations,
      subjects: [],
      standard_subjects: []
    }
  }

  renderButton() {
    if (this.props.evaluation_template) {
      let evaluation = TRAINING_STANDARD_URL + '/'+ this.state.training_standard.id +
        '/evaluation_template';
      return (
        <div className='col-md-2'>
          <a className="btn btn-success" href={evaluation}
            title={I18n.t("training_standards.create_evaluation")}>
            <i className="fa fa-eye"></i> {I18n.t("training_standards.show_evaluation")}
          </a>
        </div>
      );
    } else {
      return (
        <div className='col-md-2'>
          <button className="btn btn-success"
            title={I18n.t("training_standards.create_evaluation")}
            onClick={this.onClickCreateEvaluationTemplate.bind(this)}>
            <i className="fa fa-eye"></i> {I18n.t("training_standards.show_evaluation")}
          </button>
        </div>
      );
    }
  }

  renderShareButton() {
    if (this.state.training_standard.policy == "privated") {
      return (
        <div className='col-md-2'>
          <button className="btn btn-success"
            title={I18n.t("training_standards.share_training_standard")}
            onClick={this.onClickShareTrainingStandard.bind(this)}>
            <i className="fa fa-eye"></i> {I18n.t("training_standards.share_training_standard")}
          </button>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const NewLayout = ({Table, Pagination, Filter}) => (
      <div className="box box-success">
      <div className="row">
        <div className="row">
          <div className="col-md-12">
            <div className="border-btn">
              <button className="btn btn-success"
                title={I18n.t("training_standards.assign")}
                onClick={this.onClickButtonAssignSubject.bind(this)}>
                <i className="fa fa-plus"></i> {I18n.t("training_standards.assign")}
              </button>
              {this.renderButton()}
              {this.renderShareButton()}
            </div>
          </div>
        </div>
        <div className="row custom-padding-action">
          <div className="col-md-4 griddle-head">
            <Filter />
          </div>
          <div className="col-md-4 griddle-head">
            <Pagination />
          </div>
        </div>
        <div className="row custom-padding-table">
          <div className="col-md-12">
            <Table />
          </div>
        </div>
      </div>
      </div>
    );

    const ButtonReject = ({griddleKey}) => (
      <button className="btn btn-danger"
        onClick={this.onRejectSubject.bind(this)}
        title={I18n.t("training_standards.reject")}
        data-index={griddleKey} >
        <i className="fa fa-times" aria-hidden="true" data-index={griddleKey}></i>
      </button>
    );

    const DescriptionSubject =({value, griddleKey}) => (
      <p title={value}>{value}</p>
    );

    const LinkShowSubject = ({value, griddleKey}) => (
      <a href={SUBJECT_URL + '/' + this.props.selected_subjects[griddleKey].id}>{value}</a>
    );

    let url = TRAINING_STANDARD_URL + '/'+ this.state.training_standard.id +
      '/evaluation_template';
    return(
      <div>
        <Griddle data={this.state.selected_subjects} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id="name" title={I18n.t("subjects.headers.name")}
              customComponent={LinkShowSubject} />
            <ColumnDefinition id="description" title={I18n.t("subjects.headers.description")}
              customComponent={DescriptionSubject}/>
            <ColumnDefinition id="reject" title=' '
              customComponent={ButtonReject} />
          </RowDefinition>
        </Griddle>

        <ModalEvaluation
          url={url} showForm={this.state.showForm}
          evaluation_template={this.state.evaluation_template}
          evaluation_standards={this.state.evaluation_standards}/>

        <ModalAssign
          url={TRAINING_STANDARD_URL}
          remain_subjects={this.state.remain_subjects}
          selected_subjects={this.state.selected_subjects}
          standard_subjects={this.state.standard_subjects}
          training_standard={this.state.training_standard}
          handleAfterAssignSubject={this.handleAfterAssignSubject.bind(this)}
        />

        <ModalShareTrainingStandard
          url={TRAINING_STANDARD_URL}
          training_standard={this.state.training_standard}
          selected_organizations={this.state.selected_organizations}
          handleAfterShareTrainingStandard={this.handleAfterShareTrainingStandard.bind(this)}
        />
      </div>
    );
  }

  onRejectSubject(event) {// Delete standard_subject
    let $target = $(event.target);
    $target.blur();
    let subject = this.state.selected_subjects[$target.data('index')];
    let index = this.state.standard_subjects.findIndex(
      standard_subject => standard_subject.training_standard_id == this.state.training_standard.id &&
      standard_subject.subject_id == subject.id);


    let standard_subject = this.state.standard_subjects[index];

    if (confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(STANDARD_SUBJECTS_URL + "/" + standard_subject.id + ".json", {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        }, headers: {'Accept': 'application/json'}
      })
      .then(response => {
        index = this.state.standard_subjects.findIndex(value => value.id == standard_subject.id);
        this.state.standard_subjects.splice(index, 1);
        this.state.remain_subjects.push(subject);
        index = this.state.selected_subjects.findIndex(value => value.id == subject.id);
        this.state.selected_subjects.splice(index, 1);
        this.setState({
          standard_subjects: this.state.standard_subjects,
          remain_subjects: this.state.remain_subjects,
          selected_subjects: this.state.selected_subjects
        });
      }).catch(error => {
        console.log(error);
      });
    }
  }

  handleAfterAssignSubject(select_subjects) {// Handle create standard_subject
    select_subjects.map((select_subject) => {
      this.sendRequestAssign(select_subject);
    });
  }

  handleAfterShareTrainingStandard(select_organizations) {
    select_organizations.map((select_organization) => {
      this.sendRequestShare(select_organization);
    });
  }

  sendRequestShare(organization) {
    axios.post(SHARE_WITH_URL + ".json", {
      share_with: {
        training_standard_id: this.state.training_standard.id,
        organization_id: organization.id
      }, authenticity_token: ReactOnRails.authenticityToken(),
        headers: {'Accept': 'application/json'}
    }).then(response => {
      _.remove(this.state.selected_organizations,
        shared => shared.id === response.data.share_with.organization_id);
      this.setState({
        selected_organizations: this.state.selected_organizations
      });
    }).catch(error => {
      console.log(error);
    });
  }

  sendRequestAssign(subject) { //create standard_subject
    axios.post(STANDARD_SUBJECTS_URL + ".json", {
      standard_subject: {
        training_standard_id: this.state.training_standard.id,
        subject_id: subject.id
      }, authenticity_token: ReactOnRails.authenticityToken(),
        headers: {'Accept': 'application/json'}
    }).then(response => {
      this.state.selected_subjects.push(subject);
      let index = this.state.remain_subjects.findIndex(
        remain_subject => remain_subject.id == subject.id);
      this.state.remain_subjects.splice(index, 1);
      this.state.standard_subjects.push(response.data.standard_subject);

      this.setState({
        selected_subjects: this.state.selected_subjects,
        remain_subjects: this.state.remain_subjects,
        standard_subjects: this.state.standard_subjects
      });
    }).catch(error => {
      console.log(error);
    });
  }

  onClickButtonAssignSubject() {
    $('#modalAssignSubject').modal();
  }

  onClickCreateEvaluationTemplate(){
    let evaluation_template = this.state.evaluation_template;
    this.setState({
      evaluation_standards: [],
      evaluation_template: {
        name: ''
      },
      showForm: '',
    });
    $('#modalEvaluation').modal();
  }

  onClickShareTrainingStandard() {
    $('.modal-share-training-standard').modal();
  }
}
