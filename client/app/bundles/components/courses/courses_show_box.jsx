import React from 'react';
import axios from 'axios'
import MenuCourse from './menu_course'

import * as app_constants from 'constants/app_constants';
import * as program_constants from '../programs/program_constants';
import * as course_constants from './course_constants';
import * as subject_constants from '../subjects/subject_constants';
import * as user_constants from '../users/user_constants';

require('../sass/course.css.scss');

const COURSE_URL = app_constants.APP_NAME + program_constants.PROGRAMS_PATH;

export default class CoursesShowBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.course,
      course_subjects: [],
    }
  }

  componentWillMount() {
    Object.assign(this.state.course, {
      trainer: {},
      trainers: [],
      trainee: {},
      trainees: [],
      creator: {
         id: {},
         avatar: {}
       },
       owner: '',
    });
    this.setState({course: this.state.course});
  }

  componentDidMount() {
    this.fetchFunctions();
  }

  fetchFunctions() {
    const COURSES_URL = COURSE_URL + this.props.program.id + '/' +
      course_constants.COURSES_PATH + this.props.course.id;
    axios.get(COURSES_URL + '.json')
      .then(response => {
        this.setState({
          course: response.data.course,
          course_subjects: response.data.course_subjects
        });
      })
      .catch(error => {
        console.log(error);
      })
  }

  renderCourseSubjects() {
    return this.state.course_subjects.map((course_subject, index) => {
      let course_subject_path = app_constants.APP_NAME +
        course_constants.COURSES_PATH + this.props.course.id + '/' +
        subject_constants.SUBJECTS_PATH + course_subject.subject_id;
      let subject_image = course_subject.subject.image.url;
      return (
        <div key={index}>
          <a href={course_subject_path}>
            <div className='subject col-xs-11 row'>
              <div className='col-xs-2 subject-image img-resposive'>
                <img className='img-circle' src={(subject_image == 'null' ||
                  subject_image == 'undefined') ? '/uploads/course/image/1/edu.jpg' :
                  subject_image} width='100' height='100'/>
              </div>
              <div className='col-xs-10 infor'>
                <div>
                  <span className='subject-name'>
                    {course_subject.subject_name}
                  </span>&nbsp;
                  <span>
                    <i>
                      {I18n.t('course.during_time',
                        {during_time: course_subject.subject.during_time})}
                    </i>
                  </span>
                </div>
                <div>
                  {course_subject.subject_description.substring(0, 110)}
                </div>
              </div>
            </div>
          </a>
        </div>
      );
    });
  }

  renderUser(user) {
    let user_path = app_constants.APP_NAME + user_constants.USER_PATH + user.id;
    return (
     <li key={user.id}>
       <a href={user_path} title={user.name}>
         <img className='img-circle' src={user.avatar.url} width='30' height='30'/>
       </a>
     </li>
    );
  }

  renderMembers(users) {
    return (
      <ul className='user-list clearfix'>
        {
          users.map((user, index) => {
            return this.renderUser(user)
          })
        }
      </ul>
    );
  }

  renderUsers() {
    let course = this.state.course;
    let creator_path = '';
    if(this.state.course.creator.name){
      creator_path = app_constants.APP_NAME + user_constants.USER_PATH +
        course.creator.id;
    }
    let owner_path = '';
    let owner_avatar = '';
    let name_owner = '';
    if(this.state.course.owner) {
      owner_path = app_constants.APP_NAME + user_constants.USER_PATH +
        course.owner.id;
      owner_avatar = this.state.owner.avatar.url;
      name_owner = this.state.course.owner.name;
    }
    return (
      <div>
        <div className='box box-primary'>
          <div className='box-header with-border'>
            <h3 className='label box-title'>
              {I18n.t('course.creator.title')}
            </h3>
            <a href={creator_path} title={this.state.course.creator.name}>
              <img className='img-circle' width='30' height='30'
                src={this.state.course.creator.avatar.url} />
            </a>
          </div>
        </div>

        <div className='box box-primary'>
          <div className='box-header with-border'>
            <h3 className='label box-title'>
              {I18n.t('course.owner.title')}
            </h3>
            <a href={owner_path} title={name_owner}>
              <img className='img-circle' width='30' height='30'
                src={owner_avatar} />
            </a>
          </div>
        </div>

        <div className='box box-primary'>
          <div className='box-header with-border'>
            <h3 className='label box-title'>
              {I18n.t('course.member.title')}
            </h3>
            <span className='badge label-primary'>
              {course.member_size}
            </span>
          </div>
          <div className='box-body'>
            <div>
              <div className='member-title'>
                {I18n.t('course.member.trainers')}
              </div>
              {this.renderMembers(course.trainers)}
              <div className='member-title'>
                {I18n.t('course.member.trainees')}
              </div>
              {this.renderMembers(course.trainees)}
            </div>
          </div>
        </div>

        <div className='sector-content'>
          <div className='box box-primary'>
            <div className='box-header with-border'>
              <h3 className='label box-title'>
                {I18n.t('course.note')}
              </h3>
            </div>
            <div className='box-body'>
              <div className='subject-note'>
                {I18n.t('course.time', {start_date: course.start_date,
                   end_date: course.end_date})}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return(
      <div id='course-show' className='row'>
        <div className='col-md-9'>
          <div className='col-sm-11 image-course-header'>
            <div className='subject-image img-resposive'>
              <img className='img-circle' src={this.state.course.image.url}/>
            </div>
            <div className='course-header'>
              <span className='header-title'>
                {this.state.course.name}
              </span>
              <span className={'label-status' + ' ' + this.state.course.status +
                '-background-color'}>
                {I18n.t(`course.${this.state.course.status}`)}
              </span>
              <div className='description'>
                {this.state.course.description}
              </div>
            </div>
          </div>
          <div className='col-sm-1 pull-right'>
            <MenuCourse url={COURSE_URL + this.props.program.id + '/' +
              course_constants.COURSES_PATH + this.props.course.id}
              course={this.state.course}
              handleAfterEdit={this.handleAfterUpdate.bind(this)} />
          </div>
          <div className='subject-list'>
            {
              this.renderCourseSubjects()
            }
          </div>
        </div>
        <div className="col-md-3 info-panel">
          {
            this.renderUsers()
          }
        </div>
      </div>
    );
  }

  handleAfterUpdate(new_course){
    this.state.course[new_course.name] = new_course.value;
    if(new_course.image){
      this.state.course.image.url = new_course.image.url;
    }
    this.setState({
      course: this.state.course,
    });
  }
}
