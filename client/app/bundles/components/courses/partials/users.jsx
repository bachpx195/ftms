import CoursePolicy from 'policy/course_policy';
import Managers from '../templates/managers';
import Members from '../templates/members';
import React from 'react';

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

    let button_assign_member = null;
    if (this.props.course.status != 'finished') {
      button_assign_member = (
        <div className='pull-right'>
          <button type='button' className='btn btn-default'
            onClick={this.handleAssignMember.bind(this)}
            title={I18n.t('courses.assign_user')}>
            <i className='fa fa-user-plus'></i>
          </button>
        </div>
      );
    }

    return (
      <div className='info-panel clearfix'>
        <div className='box box-primary'>
          <div className='box-header with-border box-header-gray'>
            <h3 className='label box-title'>
              {I18n.t('courses.member.title')}
            </h3>
            <span className='badge label-primary'>
              {user_count}
            </span>
            <CoursePolicy permit={this.props.courseListPermit} >
              {button_assign_member}
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
