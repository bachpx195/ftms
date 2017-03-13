import React from 'react';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';
import Modal from './modal';
import { Select } from 'antd';


import UserLists from './user_lists';
import CourseLists from './course_lists';
import SubjectLists from './subject_lists';
import * as app_constants from 'constants/app_constants';
import * as program_constants from './program_constants';

require("!style!css!antd/lib/select/style/index.css");
require('../sass/program_show.scss');

const PROGRAM_URL = app_constants.APP_NAME + program_constants.ORGANIZATION_PATH;
const STANDARD_URL = app_constants.APP_NAME + program_constants.TRANINING_STANDARD_PATH;
const ASSIGN_STANDARD_URL = app_constants.APP_NAME + program_constants.ASSIGN_STANDARD_PATH;
const COURSE_URL = app_constants.APP_NAME + program_constants.PROGRAMS_PATH;

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
      owners: []
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
          owners: response.data.owners
        });
      })
      .catch(error => console.log(error));
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

  renderCourses(course){
    let course_managers = course.course_managers ?
      course.course_managers.slice(0, 5) : null;
    let images= null;
    if (course_managers) {
      images = course_managers.map((course_manager, index) => {
        return <img key={index} src={course_manager.user_avatar}
          className='td-course-manager-avatar' />;
      });
    }
    let course_path = COURSE_URL + this.props.program.id +'/courses/' +
      course.id;
    return (
      <div key={course.id}
        className='col-md-4 col-xs-4 col-lg-4 td-program-list-course'>
        <div className="td-course-box">
          <div className="td-course-image-manager">
            <a href={course_path}>{images}</a>
            <div className="clearfix"></div>
          </div>
          <div className='td-card-course-inner'>
            <h3>
              <a href={course_path}>{course.name}</a>
            </h3>
            <div className='td-course-content'>
              <div className='td-course-image col-xs-4'>
                <img src={course.image.url} className='img-responsive' />
              </div>
              <div className='col-xs-8 td-course-content-left'>
                <div className="td-course-description">
                  <p>{course.description}</p>
                </div>
                <div>
                  <p>{course.training_standard.name}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="clearfix"></div>
        <div className="td-course-box-before"></div>
        <div className="td-course-box-after"></div>
      </div>
    );
  }

  render() {
    let url_programs = PROGRAM_URL + '/' + this.props.organization.id + '/programs/' +
      this.props.program.id;
    let modalEdit = (
      <Modal program_detail={this.state.program_detail}
        url={COURSE_URL + this.props.program.id +'/courses'}
        image={this.state.image} program={this.props.program}
        all_roles={this.state.all_roles}
        owners={this.state.owners}
        url_programs={url_programs}
        handleAfterCreated={this.handleAfterSubmit.bind(this)} />
    );

    return (
      <div>
        <div className='margin-select'>
          <Select
            style={{ width: 500 }}
            placeholder={I18n.t('programs.select_standard')}
            onChange={this.handleSelectChange.bind(this)}
            >
              <Select.Option key="0" value="0">
                {I18n.t('training_standards.titles.all')}
              </Select.Option>
              {this.renderOptionTrainingStandard()}
          </Select>
          <ul className="pull-right list-inline">
            <li>
              <button className='btn btn-info' onClick={this.handleCreate.bind(this)}>
                {I18n.t('courses.create_course')}
              </button>
            </li>
            <li>
              <button className='btn btn-info' onClick={this.handleCreateStandard.bind(this)}>
                {I18n.t("training_standards.create")}
              </button>
            </li>
          </ul>
        </div>
        <div className='row td-padding-top'>
          {this.renderListCourses()}
        </div>
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
              <h4 className='modal-title'>
                {I18n.t("training_standards.create")}
              </h4>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmitCreateStandard.bind(this)}>
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

  renderOptionTrainingStandard(){
    return _.map(this.state.training_standards, standard => {
      return (
        <Select.Option key={standard.id} value={standard.id.toString()}>
          {standard.name}
        </Select.Option>
      );
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      courses: nextProps.courses
     });
  }

  handleCreate(event){
    $('#modalEdit').find('select, input').val('');
    $('#modalEdit').modal();
  }

  handleCreateStandard() {
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
    })
    .catch(error => console.log(error));
  }

  handleSelectChange(event){
    this.setState({
      selected_standard: parseInt(event)
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

  handleAfterSubmit(course){
    this.state.program_detail.courses.push(course);
    this.setState({
      program_detail: this.state.program_detail,
      courses: this.state.program_detail.courses
    });
  }
}
