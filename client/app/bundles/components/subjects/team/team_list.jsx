import React from 'react';
import axios from 'axios';
import Team from './team';

import * as app_constants from 'constants/app_constants';
import * as subject_constants from '../subject_constants';

const COURSE_SUBJECT_URL = app_constants.APP_NAME +
  subject_constants.COURSE_SUBJECT_PATH;

export default class TeamList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course_subject_teams: props.course_subject_teams,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      course_subject_teams: nextProps.course_subject_teams,
    });
  }

  renderTeamList(){
    return this.state.course_subject_teams.map(team => {
      let team_path = COURSE_SUBJECT_URL + team.course_subject_id + '/' +
        subject_constants.TEAM_PATH + team.id
      return (
        <div key={team.id} className='col-lg-6  col-md-6 col-sm-6'>
          <a href={team_path}>
            <Team
              team={team} user_subjects={team.user_subjects}/>
          </a>
        </div>
      );
    });
  }

  render() {
    return(
      <div className='list-container'>
        <div className='col-md-12 text-right margin-bottom-10px'>
          <button type='button' className='btn btn-primary'>
            {I18n.t('subjects.create_team')}
          </button>
        </div>
        {this.renderTeamList()}
      </div>
    );
  }

}
