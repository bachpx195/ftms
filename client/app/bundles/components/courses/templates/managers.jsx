import React from 'react';
import * as routes from 'config/routes';

export default class Managers extends React.Component {
  renderManager(user) {
    let user_path = routes.user_url(user.id);
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
    let course = this.props.course;
    let managers = [];
    for (let manager of course.managers) {
      managers.push(manager);
    }

    if (course.owner) {
      let index = managers.findIndex(user => user.id == course.owner.id);
      if (index < 0) {
        managers.unshift(course.owner);
      }
    }

    return (
      <div className='trainee-course'>
        <ul className='user-list clearfix'>
          {
            managers.map((user, index) => {
              return this.renderManager(user)
            })
          }
        </ul>
      </div>
    );
  }
}
