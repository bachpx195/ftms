import * as routes from 'config/routes';
import React from 'react';

export default class Managers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      managers: props.managers
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      managers: nextProps.managers
    });
  }

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
    let managers = this.state.managers
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
