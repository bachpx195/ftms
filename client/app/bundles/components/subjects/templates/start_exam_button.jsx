import React from 'react';
import axios from 'axios';

import * as app_constants from 'constants/app_constants';

export default class StartExamButton extends React.Component {
  render() {
    let buttons =  this.props.test_rules.map(test_rule => {
      return (
        <button key={test_rule.id} className='btn btn-info'
          onClick={this.startExam.bind(this, test_rule)}>
          {I18n.t('buttons.start_exam')}
        </button>
      );
    });

    return (
      <div>
        {buttons}
      </div>
    );
  }

  startExam(test_rule, event) {
    $(event.target).prop('disabled', true);
    let exams_url = app_constants.APP_NAME + app_constants.EXAMS_PATH;
    axios.post(exams_url, {
      test_rule_id: test_rule.id,
      course_subject_id: this.props.course_subject.id,
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      console.log(response);
      $(event.target).prop('disabled', false);
      window.location.href = exams_url + response.data.exam.id
    })
    .catch(error => console.log(error));
  }
}
