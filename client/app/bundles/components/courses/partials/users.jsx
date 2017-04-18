import React from 'react';

import CoursePolicy from 'policy/course_policy';

import * as app_constants from 'constants/app_constants';
import * as user_constants from '../../users/user_constants';

import Managers from "../templates/managers";
import Members from "../templates/members";

export default class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: props.course
    }
  }

  render() {
    let course = this.state.course;
    let user_count = course.managers.length + course.members.length;
    if (course.owner) {
      let owner_is_manager = course.managers.findIndex(user => {
        return user.id == course.owner.id;
      }) >= 0;
      if (!owner_is_manager) {
        user_count++;
      }
    }

    return (
      <div className="info-panel clearfix">
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
                <Managers course={course} />
              </ul>
              <div className='member-title'>
                {I18n.t('courses.member.trainee')}
              </div>
              <Members
                course={course}
                courseListPermit={this.props.courseListPermit}
                handleEvaluateModal={this.props.handleEvaluateModal}
                openModalChangeCourse={this.props.openModalChangeCourse} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAssignMember() {
    $('.modal-assign-member').modal();
  }
}
