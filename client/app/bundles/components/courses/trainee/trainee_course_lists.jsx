import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import * as app_constants from 'constants/app_constants';
import * as course_constants from '../course_constants';

const COURSES_URL = app_constants.APP_NAME + course_constants.MY_COURSES_PATH;
const LIMIT_MEMBERS = course_constants.LIMIT_COURSE_MEMBERS;
const DEFAULT_IMAGE_COURSE = app_constants.DEFAULT_IMAGE_COURSE_URL;
const LIMIT_DESCRIPTION = app_constants.LIMIT_DESCRIPTION;
const USER_COURSES_URL = app_constants.APP_NAME + course_constants.USER_COURSES_PATH;

export default class TraineeCourseLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: props.courses,
      user_courses: props.user_courses,
    }
  }

  renderCourseLists(){
    return this.state.courses.map(course =>{
      return this.renderCourse(course)}
    );
  }

  renderMember(member){
    return (
      <li key={member.id}>
        <img className='img-circle' src={member.avatar.url}
          className='td-member-avatar' title={member.name}/>
      </li>
    );
  }

  renderMembers(course){
    if(course.members) {
      if(course.members.length > LIMIT_MEMBERS){
        let members = course.members.slice(0, LIMIT_MEMBERS - 1);
        let html = members.map(member => {
          return this.renderMember(member);
        });

        html.push(<li className="member-list" key={course.members[LIMIT_MEMBERS].id} >
          <img className="many-member" src={course.members[LIMIT_MEMBERS].avatar.url} />
          <p className="many-member text-center">+{course.members.length - LIMIT_MEMBERS}</p>
        </li>);
        return html;
      }else{
        let members = course.members.slice(0, LIMIT_MEMBERS);
        return members.map(member => {
          return this.renderMember(member);
        });
      }
    }
  }

  renderCourse(course){
    let course_path = '';
    _.map(this.state.user_courses, user_course => {
      if(user_course.course_id == course.id) {
        course_path = USER_COURSES_URL + "/" + user_course.id;
      }
    })
    let course_managers = course.managers ? course.managers.slice(0, 5) : null;
    let images= null;
    if (course_managers) {
      images = course_managers.map(course_manager => {
        return <img key={course_manager.id} src={course_manager.avatar.url}
          className='td-course-manager-avatar' />;
      });
    }
    let description = course.description;
    if(description.length > LIMIT_DESCRIPTION){
      description = course.description.substring(0, LIMIT_DESCRIPTION) + '...';
    }
    return(
      <div key={course.id}
        className='col-md-4 col-xs-4 col-lg-4 td-program-list-course'>
        <div className="td-course-box">
          <div className="td-course-image-manager">
            <div className='course-manager'>{images}</div>
            <div className="clearfix"></div>
          </div>
          <a className='link-course' href={course_path}>
            <div className='td-card-course-inner'>
              <h3 className="course-name">
                <div>{course.name}</div>
              </h3>
              <div className='td-course-content'>
                <div className='td-course-image col-xs-4'>
                  <img src={course.image.url ? course.image.url : DEFAULT_IMAGE_COURSE}
                    className='img-responsive' />
                </div>
                <div className='col-xs-8 td-course-content-left'>
                  <div className='training_standard'>
                    <p>
                      {course.training_standard ? course.training_standard.name : ''}
                    </p>
                  </div>
                  <div className="td-course-description" title={course.description}>
                    <p>
                      {description ? description : I18n.t('courses.default_description')}
                    </p>
                  </div>
                </div>
              </div>
              <div className='view-members'>
                <div className='with-border'>
                  <span className='members-count'>
                    {I18n.t('courses.members')}
                  </span>
                  <span className='badge label-primary'>
                    {course.members ? course.members.length : '0'}
                  </span>
                </div>
                <ul className='user-list clearfix'>
                  {this.renderMembers(course)}
                </ul>
              </div>
            </div>
          </a>
          <div className="clearfix"></div>
        </div>
        <div className="clearfix"></div>
        <div className="td-course-box-before"></div>
        <div className="td-course-box-after"></div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <div className='row td-padding-top-course-lists'>
          {this.renderCourseLists()}
        </div>
      </div>
    );
  }
}
