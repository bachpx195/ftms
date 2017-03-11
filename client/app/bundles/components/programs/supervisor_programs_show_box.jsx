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

export default class SupervisorProgramsShowBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: '',
      program_detail: {},
      training_standards:[],
      courses: [],
      course: {}
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
          courses: response.data.program_detail.courses,
          training_standards: response.data.program_detail.training_standards,
        });
      })
      .catch(error => {
          console.log(error);
        }
      );
  }

  renderOptionTrainingStandard(){
    return _.map(this.state.training_standards, standard => {
      return (
        <Select.Option key={standard.id} value={standard.name}>
          {standard.name}
        </Select.Option>
      );
    });
  }

  renderListCourses () {
    return _.map(this.state.program_detail.courses, course => {
      let course_managers = course.course_managers ?
        course.course_managers.slice(0, 5) : null;
      let images= null;
      if (course_managers) {
        images = course_managers.map((course_manager, index) => {
          return <img key={index} src={course_manager.user_avatar}
            className='td-course-manager-avatar' />;
        });
      }

      return (
        <div key={course.id}
          className='col-md-4 col-xs-4 col-lg-4 td-program-list-course'>
          <div className="td-course-box">
            <div className="td-course-image-manager">
              {images}
              <div className="clearfix"></div>
            </div>
            <div className='td-card-course-inner'>
              <h3>
                {course.name}
              </h3>
              <div className='td-course-content'>
                <div className='td-course-image col-xs-4'>
                  <img src={course.image.url} className='img-responsive' />
                </div>
                <div className='col-xs-8 td-course-content-left'>
                  <div className="td-course-description">
                    <p>{course.description}</p>
                  </div>
                  <div className="td-course-edit-delete">
                    <a onClick={this.handlEdit.bind(this, course)}>
                      <span className="glyphicon glyphicon-edit pull-right"
                        aria-hidden="true">
                      </span>
                    </a>
                    <a onClick={this.handleDelete.bind(this, course)}>
                      <span className="glyphicon glyphicon-trash pull-right"
                        aria-hidden="true">
                      </span>
                    </a>
                    <span className='pull-left'>
                      {course.subject_count} {I18n.t('programs.subjects')}
                    </span>
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
    });
  }

  render() {
    let url = PROGRAM_URL + '/' + this.props.organization.id + '/programs/' +
      this.props.program.id + '/courses';

    let modalEdit = (
        <Modal program_detail={this.state.program_detail}
          url={url}
          program={this.props.program}
          course={this.state.course}
          handleAfterEdit={this.handleAfterUpdate.bind(this)}
          handleAfterCreated={this.handleAfterSubmit.bind(this)} />
      );

    return (
      <div>
        <div className='margin-select'>
          <Select
            style={{ width: 500 }}
            placeholder={I18n.t('program.select_standard')}>
              <Select.Option key="0" value="All">
                {I18n.t('training_standard.titles.all')}
              </Select.Option>
              {this.renderOptionTrainingStandard()}
          </Select>
        </div>
        <div className='pull-left'>
          <button className='btn btn-info' onClick={this.handleCreate.bind(this)}>
            {I18n.t('course.create_course')}
          </button>
        </div>
        <div className='row td-padding-top'>
          {this.renderListCourses()}
        </div>
        {modalEdit}
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.modal){
      $('#modalEdit').modal();
    }
  }

  handleCreate(event){
    this.setState({
      courses: [],
      course: {},
      modal: {}
    });
  }

  handleAfterUpdate(new_course){
    let index = this.state.program_detail.courses
      .findIndex(course => course.id === new_course.id);
    this.state.program_detail.courses[index] = new_course;
    this.setState({
      program_detail: this.state.program_detail,
      courses: this.state.program_detail.courses,
      course: {},
      modal: ''
    });
  }

  handleAfterSubmit(course){
    this.state.program_detail.courses.push(course);
    this.setState({
      program_detail: this.state.program_detail,
      courses: this.state.program_detail.courses,
      course: {},
      modal: ''
    })
  }

  handleDelete(event, data) {
    let course = event;
    if(confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(this.props.program.id + '/courses' + '/' + course.id, {
        params: {
          program_id: course.program_id,
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        _.remove(this.state.program_detail.courses, _course => {
          return _course.id == course.id;
        });
        this.setState({
          program_detail: this.state.program_detail,
          courses: this.state.program_detail.courses,
          modal: ''
        })
      })
      .catch(error => this.setState({errors: error.response.data.errors}));
    }
  }

  handlEdit(event, data){
    this.setState({
      modal: {},
      course: event
    });
  }
}
