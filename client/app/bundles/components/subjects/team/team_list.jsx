import React from 'react';
import axios from 'axios';
import Team from './team';
import Modal from './modal';

import * as app_constants from 'constants/app_constants';
import * as subject_constants from '../subject_constants';
import SubjectPolicy from 'policy/subject_policy';

const COURSE_SUBJECT_URL = app_constants.APP_NAME +
  subject_constants.COURSE_SUBJECT_PATH;

export default class TeamList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course_subject_teams: props.course_subject_teams,
      course_subject: props.course_subject,
      unassigned_user_subjects: props.unassigned_user_subjects,
      owner_id: props.owner_id,
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
      let team_path = app_constants.APP_NAME + subject_constants.TEAM_PATH +
        team.id;
      return (
        <div key={team.id} className='col-lg-6 col-md-6 col-sm-6'>
          <a href={team_path}>
            <Team
              team={team} user_subjects={team.user_subjects}/>
          </a>
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
                {I18n.t('subjects.create_team')}
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
    let url = app_constants.APP_NAME + subject_constants.TEAM_PATH;
    return (
      <Modal url={url} handleAfterSaved={this.handleAfterCreated.bind(this)}
        unassigned_user_subjects={this.state.unassigned_user_subjects}
        course_subject={this.props.course_subject} />
    );
  }

  onCreateTeam() {
    $('#modalTeam').modal();
  }

  handleAfterCreated(team) {
    this.props.handleAfterCreatedTeam(team);
  }
}
