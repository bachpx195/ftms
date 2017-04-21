import axios from 'axios';
import React from 'react';
import * as app_constants from 'constants/app_constants';

const DYNAMICTASKS_URL = app_constants.APP_NAME + 
  app_constants.DYNAMICTASKS_PATH;

export default class Update extends React.Component {

  render() {
    return (
      <li>
        <a onClick={this.submitAssignment.bind(this)}>
          {I18n.t('meta_tasks.statuses.' + this.props.status)}</a>
      </li>
    );
  }

  submitAssignment() {
    let text_status = 'in_progress';
    let team_status = 'reject';
    if (this.props.status == 'in_progress') {
      text_status = 'finish';
      team_status = 'finish';
    }
    let course_subject = this.props.course_subject;
    axios.put(DYNAMICTASKS_URL + '/' + this.props.dynamic_task.id + '.json', {
      course_subject: course_subject,
      dynamic_task: {
        status: text_status,
        team_status: team_status
      }, authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      this.props.afterUpdateStatus(response.data.dynamic_task);
    })
    .catch(error => {
      console.log(error);
    })
  }
}
