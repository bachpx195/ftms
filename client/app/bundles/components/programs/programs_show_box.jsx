import React from 'react';
import axios from 'axios';

import UserLists from './user_lists';
import CourseLists from './course_lists';
import SubjectLists from './subject_lists';
import * as app_constants from 'constants/app_constants';
import * as program_constants from './program_constants';

const PROGRAM_URL = app_constants.APP_NAME + program_constants.PROGRAM_PATH;

export default class ProgramsShowBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      program_detail: {}
    };
  }

  componentDidMount() {
    this.fetchProgram();
  }

  fetchProgram() {
    const url = PROGRAM_URL + '/' + this.props.organization.id + '/programs' + '/' +
      this.props.program.id;
    axios.get(url + '.json')
      .then(response => {
        this.setState({
          program_detail: response.data.program_detail,
        });
      })
      .catch(error => {
          console.log(error);
        }
      );
  }

  render() {
    return (
      <div className='row padding-top'>
        <div className='col-lg-3 col-xs-6'>
          <div className='small-box bg-aqua'>
            <div className='inner'>
              <h3>{this.state.program_detail.user_counts}</h3>

              <b>{I18n.t("programs.users")}</b>
            </div>
            <div className='icon'>
              <i className='ion fa fa-users' aria-hidden='true'></i>
            </div>
          </div>
        </div>
        <div className='col-lg-3 col-xs-6'>
          <div className='small-box bg-green'>
            <div className='inner'>
              <h3>{this.state.program_detail.course_counts}</h3>

              <b>{I18n.t("programs.courses")}</b>
            </div>
            <div className='icon'>
              <i className='ion fa fa-object-group' aria-hidden='true'></i>
            </div>
          </div>
        </div>
        <div className='col-lg-3 col-xs-6'>
          <div className='small-box bg-yellow'>
            <div className='inner'>
              <h3>{this.state.program_detail.program_subject_counts}</h3>

              <b>{I18n.t("programs.subjects")}</b>
            </div>
            <div className='icon'>
              <i className='ion fa fa-file-text-o' aria-hidden='true'></i>
            </div>
          </div>
        </div>
        <UserLists
          users={this.state.program_detail.users}
          user_counts={this.state.program_detail.user_counts}
          program_name={this.state.program_detail.name} />
        <CourseLists
          courses={this.state.program_detail.courses}
          course_counts={this.state.program_detail.course_counts}
          program_name={this.state.program_detail.name}
        />
        <SubjectLists
          subjects={this.state.program_detail.program_subjects}
          program_subject_counts={this.state.program_detail.program_subject_counts}
          program_name={this.state.program_detail.name}
        />
      </div>
    );
  }
}
