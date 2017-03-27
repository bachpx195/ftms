import React from 'react';
import axios from 'axios';

export default class Team extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      team: props.team,
      user_subjects: props.user_subjects,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      team: nextProps.team,
      user_subjects: nextProps.user_subjects,
    });
  }

  renderTeamMembers(){
    return this.state.user_subjects.map(user_subject => {
      let statusClass = 'fa fa-circle fa-1 ' + user_subject.status.replace('_', '-');
      return (
        <tr key={user_subject.id} className='team-user-subject-item'>
          <td>
            <span className='user-subject-status'>
              <i className={statusClass}></i>
            </span>
            {user_subject.user_name}
          </td>
          <td>
            {user_subject.start_date}
          </td>
          <td>
            {user_subject.end_date}
          </td>
        </tr>
      );
    });
  }

  render() {
    return(
      <div className='team'>
        <h2>
          <i className='fa fa-fw fa-star'></i>
          <strong>{this.state.team.name}</strong>
        </h2>
        <div className='team-content' >
          <div className='table-responsive'>
            <table className='table table-condensed member-table'>
              <thead>
                <tr>
                  <th>{I18n.t('subjects.team_member.name')}</th>
                  <th>{I18n.t('subjects.team_member.start_date')}</th>
                  <th>{I18n.t('subjects.team_member.end_date')}</th>
                </tr>
              </thead>
              <tbody>
                {this.renderTeamMembers()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

}
