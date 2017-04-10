import React from 'react';

export default class ListUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
      checked_users: props.checkedUsers
    };
  }

  componentWillReceiveProps(nextProps) {
    let filter = $('#filter-' + this.props.className).val();
    let users = nextProps.users.filter(user => {
      return user.name.toLowerCase().includes(filter.toLowerCase());
    });
    this.setState({users: this.state.users});
    this.setState({
      users: users,
      checked_users: nextProps.checkedUsers
    });
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-heading text-center">
          {this.props.title}
        </div>
        <div className="panel-body">
          <input className="form-control search_form"
            id={`filter-${this.props.className}`}
            placeholder={I18n.t('courses.search_user')}
            autoComplete="off" onChange={this.filterUsers.bind(this)} />
          <div className={`list-group ${this.props.className}`}>
            {this.renderUsers()}
          </div>
          <div className="panel-footer count-member">
            {I18n.t('courses.labels.records',
              {count: this.state.users.length})}
          </div>
        </div>
      </div>
    );
  }

  renderUsers() {
    return this.state.users.map(user => {
      let checked = this.state.checked_users.indexOf(user) >= 0;
      return <li key={`${this.props.className}-${user.id}`}
        className={`list-group-item ${checked ? 'active' : ''}`}
        onClick={this.handleClickUser.bind(this, user, checked)}>
        <span className={`glyphicon
          glyphicon-${checked ? 'check' : 'unchecked'} check-icon`} />
        {user.name}
      </li>;
    });
  }

  handleClickUser(user, checked) {
    this.props.handleClickUser(user, checked);
  }

  filterUsers(event) {
    let value = event.target.value;
    this.state.users = this.props.users.filter(user => {
      return user.name.toLowerCase().includes(value.toLowerCase());
    });
    this.setState({users: this.state.users});
  }
}
