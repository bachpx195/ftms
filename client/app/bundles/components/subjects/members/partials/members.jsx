import * as routes from 'config/routes';
import React from 'react';

export default class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      members: props.members
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      members: nextProps.members
    });
  }

  renderMember(user) {
    let user_path = routes.user_url(user.id);
    return (
      <li className="member-item" key={user.id}>
        <a href={user_path} title={user.name}>
          <img className='img-circle'
            src={user.avatar.url} width='30' height='30'/>
        </a>
      </li>
    );
  }

  render() {
    return (
      <ul className='member-list clearfix'>
        {
          this.state.members.map((user, index) => {
            return this.renderMember(user);
          })
        }
      </ul>
    )
  }
}
