import React from 'react';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';
import Modal from './modal';
import Errors from '../shareds/errors';
import ModalPreviewDocument from '../shareds/modal_preview_document';
import Dropzone from 'react-dropzone';

import CourseListsBox from '../courses/course_lists_box';
import UserLists from './user_lists';
import SubjectLists from './subject_lists';
import CourseManagers from './list_items/course_managers';
import * as app_constants from 'constants/app_constants';
import * as program_constants from './program_constants';
import * as user_constants from '../users/user_constants';
import * as course_constants from '../courses/course_constants';

require('../../assets/sass/program_show.scss');

const PROGRAM_URL = app_constants.APP_NAME + program_constants.ORGANIZATION_PATH;
const STANDARD_URL = app_constants.APP_NAME + program_constants.TRANINING_STANDARD_PATH;
const ASSIGN_STANDARD_URL = app_constants.APP_NAME + program_constants.ASSIGN_STANDARD_PATH;
const COURSE_URL = app_constants.APP_NAME + program_constants.PROGRAMS_PATH;
const LIMIT_COURSE_MEMBERS = program_constants.LIMIT_COURSE_MEMBERS;
const DEFAULT_IMAGE_COURSE = app_constants.DEFAULT_IMAGE_COURSE_URL;
const LIMIT_DESCRIPTION = app_constants.LIMIT_DESCRIPTION;

export default class SupervisorProgramsShowBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      program_detail: {},
      training_standards:[],
      image: '',
      selected_standard: 0,
      course: {},
      all_roles: [],
      owners: [],
      organization: [],
      errors: null,
      documents: [],
      document_preview: {}
    };
  }

  componentDidMount() {
    this.fetchProgram();
  }

  fetchProgram() {
    const url = PROGRAM_URL + '/' + this.props.organization.id + '/programs/' +
      this.props.program.id;
    axios.get(url + '.json')
      .then(response => {
        this.setState({
          program_detail: response.data.program_detail,
          training_standards: response.data.program_detail.training_standards,
          all_roles: response.data.all_roles,
          owners: response.data.owners,
          organization: response.data.program_detail.organization,
          documents: response.data.program_detail.documents
        });
      })
      .catch(error => console.log(error));
  }


  renderCourseMember(member){
    return (
      <li key={member.id}>
        <img src={member.avatar.url}
          className='td-member-avatar img-circle' title={member.name}/>
      </li>
    );
  }

  renderListCourses() {
    return _.map(this.state.program_detail.courses, course => {
      if (course.training_standard.id == this.state.selected_standard) {
        return this.renderCourses(course)
      }
      if(this.state.selected_standard == 0){
        return this.renderCourses(course)
      }
    });
  }

  renderCourses(course) {
    let course_path = COURSE_URL + this.props.program.id + '/' +
      course_constants.COURSES_PATH + course.id;
    return (
      <CourseListsBox key={course.id} url={course_path}
        course={course} managers={course.course_managers} />
    );
  }

  renderProgramRightPanel() {
    return(
      <div>
        <div className='box box-primary'>
          <div className='box-header with-border box-header-gray'>
            <h3 className='box-title'>
              <strong>{I18n.t('programs.list_courses')} </strong>
            </h3>
            <span className='badge label-primary'>
              {this.state.program_detail.course_counts}
            </span>
          </div>
          <div className='box-body'>
            <div className="info-box bg-gray">
              <span className="info-box-icon">
                <i className="fa fa-flag-checkered fa-1x"></i>
              </span>
              <div className="info-box-content">
                <span className="info-box-text">
                  {I18n.t('programs.list_init_courses')}
                </span>
                <span className="info-box-number">
                  {this.countCoursesByStatus("init")}
                </span>
              </div>
            </div>
            <div className="clearfix"></div>
            <div className="info-box bg-blue">
              <span className="info-box-icon">
                <i className="fa fa-hourglass-half fa-1x"></i>
              </span>
              <div className="info-box-content">
                <span className="info-box-text">
                  {I18n.t('programs.list_in_progress_courses')}
                </span>
                <span className="info-box-number">
                  {this.countCoursesByStatus("in_progress")}
                </span>
              </div>
            </div>
            <div className="clearfix"></div>
            <div className="info-box bg-green">
              <span className="info-box-icon">
                <i className="fa fa-check fa-1x"></i>
              </span>
              <div className="info-box-content">
                <span className="info-box-text">
                  {I18n.t('programs.list_finished_courses')}
                </span>
                <span className="info-box-number">
                  {this.countCoursesByStatus("finished")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderUser(user) {
    let user_path = app_constants.APP_NAME + user_constants.USER_PATH + user.id;
    return (
     <li key={user.id}>
       <a href={user_path} title={user.name}>
         <img className='img-circle' src={user.avatar.url} width='20' height='20'/>
       </a>
     </li>
    );
  }

  renderMembers(users) {
    return (
      <ul className='user-list clearfix'>
        {users.map(user => this.renderUser(user))}
      </ul>
    );
  }

    renderDocument(document) {
    let document_url = document.file.url;
    let document_name =
      document_url.substring(document_url.lastIndexOf('/') + 1);

    return (
      <li className='document-item' key={document.id}>
        <span className='direct-document'>
          <a href={document_url} title={document_name} className='document-name'
            download={document_name} target='_blank'>
            {document_name}
          </a>
        </span>
        <div className='pull-right preview-document-button'>
          <button
            onClick={this.clickPreviewDocument.bind(this, document)}
            className='pull-right btn btn-info btn-xs'>
            {I18n.t("buttons.preview")}
          </button>
        </div>
      </li>
    );
  }

  renderDocuments() {
    return (
      <div className='col-md-3 info-panel'>
        <div className='box box-primary'>
          <div className='box-header with-border box-header-gray'>
            <h3 className='label box-title'>
              {I18n.t("documents.title")}
            </h3>
            <div className="pull-right">
              <button type="button" className="btn btn-default"
                onClick={this.handleUploadDocument.bind(this)}
                title={I18n.t("documents.select_document")}>
                <i className="fa fa-upload"></i>
              </button>
              <form encType="multipart/form-data">
                <div className='hidden'>
                  <Dropzone onDrop={this.onDocumentsDrop.bind(this)}
                    ref='dropzoneDocumentsField'
                    multiple={false}
                    accept={app_constants.ACCEPT_DOCUMENT_TYPES} />
                </div>
              </form>
            </div>
          </div>
          <div className='box-body'>
            <ul className='document-list clearfix'>
              {
                this.state.documents.map((document, index) => {
                  return this.renderDocument(document);
                })
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }

  render() {
    let url_programs = PROGRAM_URL + '/' + this.props.organization.id + '/' +
    program_constants.PROGRAMS_PATH + this.props.program.id;
    let modalEdit = (
      <Modal program_detail={this.state.program_detail}
        url={COURSE_URL + this.props.program.id +'/courses'}
        image={this.state.image} program={this.props.program}
        all_roles={this.state.all_roles}
        owners={this.state.owners} course={this.state.course}
        url_programs={url_programs} />
    );

    return (
      <div className='clearfix'>
        <div className='col-md-9'>
          <div className='margin-select row'>
            <div className='col-md-6'>
              <div className='box box-primary box-float'>
                <div className='box-header with-border box-header-gray'>
                  <h4 className='box-title'>
                    <strong>{I18n.t('programs.info')}</strong>
                  </h4>
                </div>
                <div className='box-body'>
                  <div>
                    <div className='member-title'>
                      <strong>{I18n.t('programs.headers.name')}: </strong>
                      {this.state.program_detail.name}
                    </div>
                    <br />
                    <div className='member-title'>
                      <strong>{I18n.t('programs.organization')}: </strong>
                      {this.state.organization.name}
                    </div>
                    <br />
                    <div className='member-title'>
                      <strong>{I18n.t('programs.owners')}: </strong>
                    </div>
                    {this.renderMembers(this.state.owners)}
                  </div>
                </div>
              </div>
            </div>
            <div className='program-control' className='col-md-6'>
              <fieldset>
                <legend>Sort</legend>
                <select className="form-control"
                  onChange={this.handleSelectChange.bind(this)}>
                  <option key="0" value="0">
                    {I18n.t('training_standards.titles.all')}
                  </option>
                  {this.renderOptionTrainingStandard()}
                </select>
              </fieldset>
              <button className='btn btn-info' onClick={this.handleCreate.bind(this)}>
                {I18n.t('courses.create_course')}
              </button>
              <button className='btn btn-info' onClick={this.handleCreateStandard.bind(this)}>
                {I18n.t("training_standards.create")}
              </button>
            </div>
          </div>
          <div className='course-container'>
            <div className='row td-padding-top'>
              {this.renderListCourses()}
            </div>
          </div>
        </div>
        <div className='col-md-3 info-panel'>
          {this.renderProgramRightPanel()}
        </div>
        {this.renderDocuments()}
        <ModalPreviewDocument
          document_preview={this.state.document_preview}
          handleDocumentDeleted={this.handleDocumentDeleted.bind(this)}
        />
        {modalEdit}
        {this.renderModalCreateStandard()}
      </div>
    );
  }

  renderModalCreateStandard() {
    return (
      <div id="modalCreateStandards" className="modal fade in" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close"
                data-dismiss="modal">&times;</button>
              <h4 className="modal-title">
                {I18n.t("training_standards.create")}
              </h4>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmitCreateStandard.bind(this)}>
                <Errors errors={this.state.errors} />
                <div className="form-group">
                  <input type="text" placeholder={I18n.t("training_standards.headers.name")}
                    className="form-control" name="name" ref="nameField" />
                </div>
                <div className="form-group">
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">{I18n.t("buttons.save")}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  countCoursesByStatus(status){
    let count = 0;
    _.map(this.state.program_detail.courses, course => {
      if(course.status == status) {
        count++;
      }
    });
    return count;
  }

  renderOptionTrainingStandard(){
    return _.map(this.state.training_standards, standard => {
      return (
        <option key={standard.id} value={standard.id.toString()}>
          {standard.name}
        </option>
      );
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      courses: nextProps.courses,
      program_detail: nextProps.program_detail,
      organization: nextProps.organization,
     });
  }

  handleCreate(event){
    $('.modalEdit').find('select, input').val('');
    $('.modalEdit').modal();
    this.setState({
      course: {}
    });
  }

  handleCreateStandard() {
    $('#modalCreateStandards').find('input').val('');
    $('#modalCreateStandards').modal();
  }

  handleSubmitCreateStandard(event) {
    event.preventDefault();
    axios.post(STANDARD_URL, {
      training_standard: {
        name: this.refs.nameField.value
      }, authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      this.state.training_standards.push(response.data.training_standard);
      this.assignStandards(response.data.training_standard);
      this.setState({
        training_standards: this.state.training_standards
      });
      $('#modalCreateStandards').modal('hide');
      this.refs.nameField.value = ''
      window.location.href = STANDARD_URL + '/' + response.data.training_standard.id;
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }

  handleSelectChange(event){
    this.setState({
      selected_standard: parseInt(event.target.value)
    });
  }

  assignStandards(training_standard) {
    axios.post(ASSIGN_STANDARD_URL, {
      program_id: this.props.program.id,
      training_standard_id: [training_standard.id],
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {

    })
    .catch(error => console.log(error));
  }

  handleAfterUpdate(new_course){
    let index = this.state.program_detail.courses
      .findIndex(course => course.id === new_course.id);
    this.state.program_detail.courses[index] = new_course;
    this.setState({
      program_detail: this.state.program_detail,
      course: {},
    });
  }

  handleUploadDocument() {
    this.refs.dropzoneDocumentsField.open();
  }

  onDocumentsDrop(acceptedFiles, rejectedFiles) {
    if (app_constants.isOverMaxDocumentSize(acceptedFiles[0])) {
      return;
    }
    let formData = new FormData();
    formData.append('document[documentable_id]', this.state.program_detail.id);
    formData.append('document[documentable_type]', 'Program');
    formData.append('document[file]', acceptedFiles[0]);
    formData.append('authenticity_token', ReactOnRails.authenticityToken());

    let url = app_constants.APP_NAME + 'documents';

    axios({
      url: url,
      method: 'POST',
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      this.handleDocumentUploaded(response.data.document);
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }

  handleDocumentUploaded(document) {
    this.state.documents.push(document);
    this.setState({documents: this.state.documents});
  }

  handleDocumentDeleted(document) {
    this.setState({
      documents: this.state.documents.filter(item => item.id != document.id)
    });
  }

  clickPreviewDocument(document) {
    this.setState({document_preview: document});
    $('.modal-preview-document').modal();
  }
}
