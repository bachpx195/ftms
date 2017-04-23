import * as routes from 'config/routes';
import React from 'react';

export default class UserBlock extends React.Component {
  render() {
    return (
      <a href={routes.user_url(this.props.user.id)}
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
