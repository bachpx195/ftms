import axios from 'axios';
import Modal from './modal';
import React from 'react';
import SubjectPolicy from 'policy/subject_policy';
import Team from './team';
import * as routes from 'config/routes';

export default class TeamList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course_subject_teams: props.course_subject_teams,
      course_subject: props.course_subject,
      unassigned_user_subjects: props.unassigned_user_subjects,
      owner_id: props.owner_id,
      team: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      course_subject_teams: nextProps.course_subject_teams,
      course_subject: nextProps.course_subject,
      unassigned_user_subjects: nextProps.unassigned_user_subjects,
      owner_id: nextProps.owner_id,
    });
  }

  renderTeamList(){
    return this.state.course_subject_teams.map(team => {
      return (
        <div key={team.id} className='col-md-12'>
          <Team
            team={team} user_subjects={team.user_subjects}
            course_subject={this.state.course_subject}
          />
        </div>
      );
    });
  }

  render() {
    var owner_id = this.state.owner_id;
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
              <button type='button' className='btn btn-primary'
                onClick={this.onCreateTeam.bind(this)}>
                <i className='fa fa-plus'></i>
                &nbsp;{I18n.t('subjects.create_team')}
              </button>
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
        unassigned_user_subjects={this.state.unassigned_user_subjects}
        course_subject={this.props.course_subject} />
    );
  }

  onCreateTeam() {
    this.setState({
      team: {},
    });
    $('.modalTeam').modal();
  }

  handleAfterCreated(team) {
    this.props.handleAfterCreatedTeam(team);
  }
}
