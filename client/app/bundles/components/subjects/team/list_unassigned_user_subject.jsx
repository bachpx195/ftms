import React from 'react';

export default class ListUnassignedUserSubject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_subjects: props.user_subjects,
      selected_user_subjects: props.selected_user_subjects
    }
  }

  componentWillReceiveProps(nextProps) {
    let filter = $('#filter').val();
    let user_subjects = nextProps.user_subjects.filter(user_subject => {
      return user_subject.user_name.toLowerCase().includes(filter.toLowerCase());
    });
    this.setState({
      user_subjects: user_subjects,
      selected_user_subjects: nextProps.selected_user_subjects
    });
  }

  render() {
    return (
      <ul className='list-group list-unassigned-user-subject'>
        <li className='list-group-item'>
          <input type='text' id='filter' className='form-control'
            placeholder={I18n.t('teams.filter_user')}
            onChange={this.filterMembers.bind(this)} />
        </li>
        {
          this.renderListUserSubjects()
        }
      </ul>
    );
  }

  filterMembers(event) {
    let value = event.target.value;
    this.state.user_subjects = this.props.user_subjects.filter(user_subject => {
      return user_subject.user_name.toLowerCase().includes(value.toLowerCase());
    });
    this.setState({user_subjects: this.state.user_subjects});
  }

  renderListUserSubjects() {
    return this.state.user_subjects.map(user_subject => {
      let selected = this.state.selected_user_subjects.findIndex(_user_subject => {
        return _user_subject.id == user_subject.id;
      }) >= 0;
      let class_selected = selected ? 'active' : '';
      let icon = selected ? 'glyphicon-check' : 'glyphicon-unchecked';
      return (
        <li key={user_subject.id} className={`list-group-item ${class_selected}`}
          onClick={this.onUserSubjectClick.bind(this, user_subject)}>
          <span className={`glyphicon ${icon} check-icon`} />
          {user_subject.user_name}
        </li>
      );
    });
  }

  onUserSubjectClick(user_subject) {
    let index = this.state.selected_user_subjects.findIndex(_user_subject => {
      return _user_subject.id == user_subject.id;
    });
    if(index >= 0) {
      this.state.selected_user_subjects.splice(index, 1);
    } else {
      this.state.selected_user_subjects.push(user_subject);
    }
    this.setState({
      selected_user_subjects: this.state.selected_user_subjects,
    });
    this.props.setSelectedUserSubjects(this.state.selected_user_subjects);
  }
}
