import React from 'react';

import * as app_constants from 'constants/app_constants';

require('../../assets/sass/color_status.scss');
require('../../assets/sass/user_course.scss');

const LIMIT_DESCRIPTION = app_constants.LIMIT_DESCRIPTION_USER_COURSE;
const USER_COURSES_URL = app_constants.APP_NAME + app_constants.USER_COURSES_PATH;
const DEFAULT_IMAGE_COURSE = app_constants.DEFAULT_IMAGE_COURSE_URL;
const SUBJECTS_URL = app_constants.SUBJECTS_PATH;

export default class UserCoursesBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.course,
      subjects: props.subjects,
      managers: props.managers,
      members: props.members,
      user_course: props.user_course
    }
  }

  render() {
    let description = this.state.course.description;
    if(description.length > LIMIT_DESCRIPTION){
      description = this.state.course.description.substring(0, LIMIT_DESCRIPTION) + '...';
    }

    const Subject = (subject, key) => {
      let description = subject.description;
      if(description.length > LIMIT_DESCRIPTION){
        description = subject.description.substring(0, LIMIT_DESCRIPTION) + '...';
      }
      let user_subject = subject.subject_detail[0];

      return (
        <div key={key} className='col-md-12'>
          <a className='user-course-subject'
            href={USER_COURSES_URL + '/' + this.state.user_course.id + '/' + 
              SUBJECTS_URL + '/' + subject.id}>
            <div className='subject row'>
              <div className='col-md-11 image-course-header'>
                <div className='subject-image img-resposive'>
                  <img className='img-circle'
                    src={subject.image.url ? subject.image.url :
                      DEFAULT_IMAGE_COURSE}/>
                </div>
                <div className='subject-header'>
                  <span className='header-title'>
                    {subject.name}
                  </span>
                  <span className='during-time'>
                    {subject.during_time + I18n.t('courses.days')}
                  </span>
                  <div className='subject-start-date'>
                    {user_subject ?  (I18n.t('courses.start_date') + user_subject.start_date) : ' '}
                  </div>
                  <div className='description-course'
                       title={this.state.course.description}>
                    <i>
                      {description ? description : I18n.t('courses.default_description')}
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      );
    };

    return(
      <div className='user-course-show row'>
        <div className='col-md-9'>
          <div className='user-course row'>
            <div className='col-md-11 image-course-header'>
              <div className='subject-image img-resposive'>
                <img className='img-circle'
                  src={this.state.course.image.url ? this.state.course.image.url :
                    DEFAULT_IMAGE_COURSE}/>
              </div>
              <div className='course-header'>
                <span className='header-title'>
                  {this.state.course.name}
                </span>
                <span className={'label-status' + ' ' + this.state.course.status +
                  '-background-color'}>
                  {I18n.t(`courses.${this.state.course.status}`)}
                </span>
                <div className='description-course'
                  title={this.state.course.description}>
                  <i>
                    {description ? description : I18n.t('courses.default_description')}
                  </i>
                </div>
              </div>
            </div>
          </div>
          <div className="list-subject">
            {this.state.subjects.map(function(subject, i){
              return Subject(subject, i);
            })}
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

  renderUser(user) {
    let user_path = app_constants.APP_NAME + app_constants.USERS_PATH + '/' + 
      user.id;
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
    let user_count = this.state.managers.length + this.state.members.length;
    let link_owner = null;
    if(course.owner) {
      let owner_path = app_constants.APP_NAME + app_constants.USERS_PATH + '/' +
        course.owner.id;
      user_count = user_count + 1;
      link_owner = <li>
        <a href={owner_path} title={course.owner.name}>
          <img className='img-circle' src={course.owner.avatar.url}
               width='30' height='30'/>
        </a>
      </li>;
    }
    return (
      <div>
        <div className='box box-primary'>
          <div className='box-header with-border box-header-gray'>
            <h3 className='label box-title'>
              {I18n.t('courses.member.title')}
            </h3>
            <span className='badge label-primary'>
              {user_count}
            </span>
          </div>
          <div className='box-body'>
            <div>
              <div className='member-title'>
                {I18n.t('courses.member.trainers')}
              </div>
              <ul className='user-list clearfix'>
                {link_owner}
                {this.renderMembers(this.state.managers)}
              </ul>
              <div className='member-title'>
                {I18n.t('courses.member.trainee')}
              </div>
              {this.renderMembers(this.state.members)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleClickSubject(id){
    $('body').append('<a href=" ' +  '"></a>')
  }
}
