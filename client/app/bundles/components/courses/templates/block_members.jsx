import React from 'react';

import * as app_constants from 'constants/app_constants';

const LIMIT_MEMBERS = app_constants.LIMIT_COURSE_MEMBERS;

export default class BlockMembers extends React.Component {
  renderMember(member) {
    return (
      <li key={member.id}>
        <img src={member.avatar.url}
          className='td-member-avatar img-circle' title={member.name} />
      </li>
    );
  }

  renderMembers() {
    if (this.props.course.members) {
      if (this.props.course.members.length > LIMIT_MEMBERS) {
        let members = this.props.course.members.slice(0, LIMIT_MEMBERS - 1);
        let html = members.map((member) => {
          return this.renderMember(member);
        });

        html.push(
          <li className="member-list" key={this.props.course.members[LIMIT_MEMBERS].id}>
            <img className="many-member"
              src={this.props.course.members[LIMIT_MEMBERS].avatar.url} />
            <p className="many-member text-center">
              +{this.props.course.members.length - LIMIT_MEMBERS}
            </p>
          </li>
        );
        return html;
      } else {
        let members = this.props.course.members.slice(0, LIMIT_MEMBERS);
        return members.map((member) => {
          return this.renderMember(member);
        });
      }
    }
  }

  render() {
    return (
      <div className='view-members'>
        <div className='with-border'>
          <span className='members-count'>
            {I18n.t('courses.members')}
          </span>
          <span className='badge label-primary'>
            {this.props.course.members ? this.props.course.members.length : '0'}
          </span>
        </div>
        <ul className='user-list clearfix'>
          {this.renderMembers()}
        </ul>
      </div>
    );
  }
}
