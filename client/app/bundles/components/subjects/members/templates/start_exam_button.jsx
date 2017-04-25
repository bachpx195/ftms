import React from 'react';
import axios from 'axios';

import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';

export default class StartExamButton extends React.Component {
  render() {
    let current_user = JSON.parse(localStorage.current_user);
    let buttons =  this.props.test_rules.map(test_rule => {
      return (
        <button key={test_rule.id} className='btn btn-info'
          onClick={this.startExam.bind(this, test_rule)}>
          {I18n.t('buttons.start_exam')}
        </button>
      );
    });
    return (
      <div className="assignment-item clearfix">
        <div className="col-md-2 avatar-user">
          <a>
            <img className="img-circle" src={current_user.avatar.url}
              title={current_user.name}
              alt={I18n.t('subjects.trainee.avatar')} />
          </a>
        </div>

        <div className="col-md-10 info-detail">
          <div className="row title-assignment">
            <div className="div-status"
              title={`${I18n.t('subjects.assignments.statuses.' + 'init')}`}>
              <em className={'status status-init cursor'}></em>
            </div>
            <p className="name"><br/>
              {I18n.t('assignments.exam')}&nbsp;&nbsp; {buttons}
            </p>
          </div>

          <div className="detail row">
            <div className="col-md-6">
              <i className="fa fa-calendar" aria-hidden="true"></i>
              {I18n.t("subjects.trainee.start_date")}
            </div>

            <div className="col-md-6">
              <i className="fa fa-clock-o" aria-hidden="true"></i>
              {I18n.t("subjects.trainee.spend_time")}
            </div>
          </div>
        </div>
      </div>
    );
  }

  startExam(test_rule, event) {
    $(event.target).prop('disabled', true);
    let exams_url = routes.exams_url();
    axios.post(exams_url, {
      test_rule_id: test_rule.id,
      course_subject_id: this.props.course_subject.id,
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      console.log(response);
      $(event.target).prop('disabled', false);
      window.location.href = exams_url + '/' + response.data.exam.id;
    })
    .catch(error => console.log(error));
  }
}
