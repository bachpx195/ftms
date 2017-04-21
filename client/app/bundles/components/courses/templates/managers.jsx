import React from 'react';

import * as app_constants from 'constants/app_constants';

export default class Managers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: props.course
    }
  }

  renderManager(user) {
    let user_path = app_constants.APP_NAME + app_constants.USERS_PATH + '/' + 
      user.id;
    return (
      <li key={user.id}>
        <a href={user_path} title={user.name}>
          <img className='img-circle'
            src={user.avatar.url} width='30' height='30'/>
        </a>
      </li>
    );
  }

  render() {
    let managers = this.state.course.managers;
    let course = this.state.course;
    if (course.owner) {
      let index = managers.findIndex(user => user.id == course.owner.id);
      if (index < 0) {
        managers.unshift(course.owner);
      }
    }
    return (
      <ul className='user-list clearfix'>
        {
          managers.map((user, index) => {
            return this.renderManager(user)
          })
        }
      </ul>
    );
  }
}
