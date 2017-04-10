import React from 'react';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';
import Errors from '../../shareds/errors';
import * as program_constants from '../program_constants';

const LIMIT_COURSE_MEMBERS = program_constants.LIMIT_COURSE_MEMBERS;

require('../../../assets/sass/program_show.scss');

export default class CourseManagers extends React.Component {
  renderCourseManagers(managers) {
    return managers.map((manager, index) => {
      return <li key={index}>
        <img src={manager.user_avatar}
          className='td-course-manager-avatar img-circle' title={manager.name}/>
      </li>
    });
  }

  render() {
    let course_managers = this.props.course.course_managers ?
      this.props.course.course_managers : [];
    let see_more = null;
    if (course_managers.length >= 4) {
      see_more = (
        <li className="manager-list" data-toggle="modal"
          data-target={`.modal-manager-${this.props.course.id}`}
          key={LIMIT_COURSE_MEMBERS} >
          <img className="many-manager"
            src={course_managers[LIMIT_COURSE_MEMBERS].user_avatar} />
          <p className="many-manager text-center">
            +{course_managers.length - LIMIT_COURSE_MEMBERS}
          </p>
        </li>
      );
      course_managers = course_managers.slice(0, LIMIT_COURSE_MEMBERS - 1);
    }
    let html = this.renderCourseManagers(course_managers, this.props.course.id);
    return <ul>
      {html}
      {see_more}
      <div className="clearfix"></div>
    </ul>;
  }
}
