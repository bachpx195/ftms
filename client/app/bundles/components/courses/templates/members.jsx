import React from 'react';

import CoursePolicy from 'policy/course_policy';

import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';

export default class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: props.course
    }
  }

  renderMember(user) {
    let user_path = routes.user_url(user.id);
    return (
      <li className="member-item" key={user.id}>
        <a href={user_path} title={user.name}>
          <img className='img-circle'
            src={user.avatar.url} width='30' height='30'/>
          {user.name}
        </a>
        <CoursePolicy permit={this.props.courseListPermit} >
          <div className="pull-right user-course">
            <div className="menu-right-user-course">
              <div className="dropdown action-user-course">
                <span data-toggle="dropdown"
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
        </CoursePolicy>
      </li>
    );
  }

  render() {
    return (
      <ul className='member-list clearfix'>
        {
          this.state.course.members.map((user, index) => {
            return this.renderMember(user);
          })
        }
      </ul>
    )
  }

  handleEvaluateModal(user, event) {
    event.preventDefault();
    this.props.handleEvaluateModal(user);
  }

  openModalChangeCourse(user, event) {
    event.preventDefault();
    this.props.openModalChangeCourse(user);
  }
}
