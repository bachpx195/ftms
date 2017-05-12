import Modal from './modal';
import React from 'react';
import SubjectPolicy from 'policy/subject_policy';
import Team from './team';
import * as routes from 'config/routes';

export default class TeamList extends React.Component {
  renderTeamList(){
    return this.props.course_subject_teams.map(team => {
      return (
        <div key={team.id} className='col-md-12'>
          <Team course={this.props.course}
            team={team} user_subjects={team.user_subjects}
            course_subject={this.props.course_subject}
          />
        </div>
      );
    });
  }

  render() {
    let button_create_team = null;
    if (this.props.course.status != 'finished' &&
      this.props.course_subject.status != 'finished') {
      button_create_team = (
        <button type='button' className='btn btn-primary'
          onClick={this.onCreateTeam.bind(this)}>
          <i className='fa fa-plus'></i>
          &nbsp;{I18n.t('subjects.create_team')}
        </button>
      );
    }
    var owner_id = this.props.owner_id;
    return(
      <div className='list-container'>
        <SubjectPolicy
          permit={
            [{action: ['owner'], target: 'children',
                data: {owner_id: owner_id}},
              {controller: 'courses', action: ['show'],
                target: 'children', data: {controller: 'courses'}}]}
        >
          <div>
            <div className='col-md-12 text-right margin-bottom-10px'>
              {button_create_team}
            </div>
            {this.renderTeamList()}
          </div>
        </SubjectPolicy>
        {this.renderModal()}
      </div>
    );
  }

  renderModal() {
    let teams_url = routes.teams_url();
    return (
      <Modal url={teams_url} handleAfterSaved={this.handleAfterCreated.bind(this)}
        unassigned_user_subjects={this.props.unassigned_user_subjects}
        course_subject={this.props.course_subject} />
    );
  }

  onCreateTeam() {
    $('.modalTeam').modal();
  }

  handleAfterCreated(team) {
    this.props.handleAfterCreatedTeam(team);
  }
}
