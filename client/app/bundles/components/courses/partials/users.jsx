import React from 'react';
import CoursePolicy from 'policy/course_policy';
import axios from 'axios';
import * as app_constants from 'constants/app_constants';
import * as user_constants from '../../users/user_constants';

export default class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: props.course
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      course: nextProps.course
    });
  }

  renderManager(user) {
    let user_path = app_constants.APP_NAME + user_constants.USER_PATH + user.id;
    return (
      <li key={user.id}>
        <a href={user_path} title={user.name}>
          <img className='img-circle'
            src={user.avatar.url} width='30' height='30'/>
        </a>
      </li>
    );
  }

  renderManagerList(users) {
    return (
      <ul className='user-list clearfix'>
        {
          users.map((user, index) => {
            return this.renderManager(user)
          })
        }
      </ul>
    );
  }

  renderMember(user) {
    let user_path = app_constants.APP_NAME + user_constants.USER_PATH + user.id;
    return (
      <li className="member-item" key={user.id}>
        <a href={user_path} title={user.name}>
          <img className='img-circle'
            src={user.avatar.url} width='30' height='30'/>
          {user.name}
        </a>
        <CoursePolicy permit={this.props.courseListPermit} >
          <div className="pull-right user-course">
            <div id="user-course-113">
              <div className="menu-right-user-course">
                <div className="dropdown action-user-course">
                  <span id="dLabe" data-toggle="dropdown"
                    className="evaluation-show">
                    <i className="glyphicon glyphicon-align-justify text-danger">
                    </i>
                  </span>
                  <ul className="dropdown-menu dropdown-menu-right" >
                    <li>
                      <a href="#"
                        onClick={this.handleEvaluateModal.bind(this, user)} >
                        {I18n.t('courses.evaluation.evaluate')}
                      </a>
                      <a href="#"
                        onClick={this.openModalChangeCourse.bind(this, user)} >
                        {I18n.t('courses.move_courses.move_course')}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CoursePolicy>
      </li>
    );
  }

  renderMemberList(users) {
    return (
      <ul className='member-list clearfix'>
        {
          users.map((user, index) => {
            return this.renderMember(user);
          })
        }
      </ul>
    );
  }

  renderUsers() {
    let course = this.state.course;
    let user_count = course.managers.length + course.members.length;
    let link_owner = null;
    if (course.owner) {
      let owner_path = app_constants.APP_NAME + user_constants.USER_PATH +
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
            <CoursePolicy permit={this.props.courseListPermit} >
              <div className="pull-right">
                <button type="button" className="btn btn-default"
                  onClick={this.handleAssignMember.bind(this)}
                  title={I18n.t("courses.assign_user")}>
                  <i className="fa fa-user-plus"></i>
                </button>
              </div>
            </CoursePolicy>
          </div>
          <div className='box-body'>
            <div>
              <div className='member-title'>
                {I18n.t('courses.member.trainers')}
              </div>
              <ul className='user-list clearfix'>
                {link_owner}
                {this.renderManagerList(course.managers)}
              </ul>
              <div className='member-title'>
                {I18n.t('courses.member.trainee')}
              </div>
              {this.renderMemberList(course.members)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="col-md-3 info-panel">
        {
          this.renderUsers()
        }
      </div>
    )
  }

  handleEvaluateModal(user, event) {
    event.preventDefault();
    this.props.handleEvaluateModal(user);
  }

  handleAssignMember() {
    this.props.handleAssignMember();
  }

  openModalChangeCourse(user, event) {
    event.preventDefault();
    this.props.openModalChangeCourse(user);
  }
}
