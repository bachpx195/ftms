import * as app_constants from 'constants/app_constants';
import React from 'react';

const USERS_URL = app_constants.APP_NAME +
  app_constants.USERS_PATH + '/';

export default class UserBlock extends React.Component {
  render() {
    return (
      <a href={`${USERS_URL}${this.props.user.id}`}
        title={this.props.user.name}>
        <div className='profile-structure'>
          <div className='avatar'>
            <img src={this.props.user.avatar.url}
              className='img-circle' width='40' height='40'
              alt={this.props.user.name} />
          </div>
          <div>
            <strong>{this.props.user.name}</strong><br/>
            {this.props.title}
          </div>
        </div>
      </a>
    );
  }
}
