import React from 'react';
import ReactOnRails from 'react-on-rails';

import * as app_constants from 'constants/app_constants';
import * as course_constants from '../constants/course_constants';

const DEFAULT_IMAGE_USER = app_constants.DEFAULT_IMAGE_USER_URL;
const LIMIT_COURSE_MEMBERS = course_constants.LIMIT_COURSE_MEMBERS;

export default class CourseManagers extends React.Component {
  renderManagers(managers) {
    return managers.map((manager, index) => {
      let avatar = DEFAULT_IMAGE_USER;
      if (manager.user_avatar && manager.user_avatar != undefined) {
        avatar = manager.user_avatar;
      }
      if (manager.avatar && manager.avatar.url != undefined) {
        avatar = manager.avatar.url;
      }
      return <li key={index}>
        <img src={avatar}
          className='td-course-manager-avatar img-circle' title={manager.name}/>
      </li>
    });
  }

  render() {
    let managers = [];
    if (this.props.managers) {
      managers = this.props.managers;
    }
    let see_more = null;
    if (managers.length >= 4) {
      let avatar = DEFAULT_IMAGE_USER;
      let user_avatar = managers[LIMIT_COURSE_MEMBERS];
      if (user_avatar.user_avatar && user_avatar.user_avatar != undefined) {
        avatar = user_avatar.user_avatar;
      }
      if (user_avatar.avatar && user_avatar.avatar.url != undefined) {
        avatar = user_avatar.avatar.url;
      }
      see_more = (
        <li className="manager-list" data-toggle="modal"
          data-target={`.modal-manager-${this.props.course.id}`}
          key={LIMIT_COURSE_MEMBERS} >
          <img className="many-manager" src={avatar} />
          <p className="many-manager text-center">
            +{managers.length - LIMIT_COURSE_MEMBERS}
          </p>
        </li>
      );
      managers = managers.slice(0, LIMIT_COURSE_MEMBERS - 1);
    }
    let html = this.renderManagers(managers, this.props.course.id);
    return <ul>
      {html}
      {see_more}
      <div className="clearfix"></div>
    </ul>;
  }
}
