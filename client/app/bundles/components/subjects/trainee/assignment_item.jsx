import React from 'react';
import axios from 'axios';
import PublicPolicy from 'policy/public_policy';
import css from '../subject.scss';
import * as app_constants from 'constants/app_constants';
import * as subject_constants from '../subject_constants';

const ASSIGNMENT_URL = app_constants.APP_NAME + subject_constants.ASSIGNMENT_PATH;
const DYNAMICTASK_URL = app_constants.APP_NAME + subject_constants.DYNAMICTASK_PATH;
const META_TASK_PATH = subject_constants.META_TASK_PATH;

export default class AssignmentItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      assignment: props.assignment,
      course_subject_teams: props.course_subject_teams,
      course_subject: props.course_subject,
      dynamic_task: props.dynamic_task,
      meta_tasks: []
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      meta_tasks: nextProps.meta_tasks
    });
  }

  render() {
    let current_user = JSON.parse(localStorage.current_user);
    let status = this.props.status;
    let menu_action, finish_or_receive_option, send_pull = '';
    if (this.props.status == 'in_progress' || this.props.status == 'init') {
      menu_action =
        <span className="menu-assignment pull-right dropdown-toggle"
          data-toggle="dropdown" >
          <i className="glyphicon glyphicon-align-justify cursor"></i>
        </span>;
      let text_status = 'in_progress';
      let team_status = 'reject';
      if (this.props.status == 'in_progress') {
        send_pull = <li><a
          onClick={this.sendPullRequest.bind(this)}>{I18n.t('meta_tasks.send_pull')}
          </a></li>
        status = 'progress';
        text_status = 'finish';
        team_status = 'finish';
      }
      finish_or_receive_option = <li><a onClick={
          this.submitAssignment.bind(this, text_status, team_status)}>
        {I18n.t('meta_tasks.statuses' + this.props.status)}</a></li>;
      }
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
              title={`${I18n.t("subjects.assignments.statuses." + this.props.status)}`}>
              {this.props.status}
              <em className={`status status-${status} cursor`}></em>
            </div>
            <p className="name">{this.state.assignment.name}</p>
            <p className="content-assignment">{this.state.assignment.content}</p>
            <PublicPolicy permit={[{action: ['setUserTeam'], target: 'children',
              data: {course_subject_teams: this.state.course_subject_teams}}]}>
              <div>
                {menu_action}
                <ul className="dropdown-menu pull-right list-menu cursor" >
                  {send_pull}
                  {finish_or_receive_option}
                </ul>
              </div>
            </PublicPolicy>
          </div>

          <div className="detail row">
            <div className="col-md-3">
              <i className="fa fa-calendar" aria-hidden="true"></i>
              {I18n.t("subjects.trainee.start_date")}
            </div>

            <div className="col-md-3">
              <i className="fa fa-clock-o" aria-hidden="true"></i>
              {I18n.t("subjects.trainee.spend_time")}
            </div>

            <div className="col-md-3">
              <i className="fa fa-github" aria-hidden="true"></i>
              {I18n.t("subjects.trainee.github")}
            </div>

            <div className="col-md-3">
              <i className="fa fa-database" aria-hidden="true"></i>
              {I18n.t("subjects.trainee.send_count")}
            </div>
          </div>
        </div>
      </div>
    );
  }

  submitAssignment(status, team_status) {
    let course_subject = this.state.course_subject;
    axios.put(DYNAMICTASK_URL + '/' + this.state.dynamic_task.id + '.json', {
      course_subject: course_subject,
      dynamic_task: {
        status: status,
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

  sendPullRequest(event) {
    event.preventDefault();
    this.fetchListMetaTask(this.state.dynamic_task);
    $('#modalSendPull').modal();
  }

  fetchListMetaTask(dynamic_task) {
    let url = DYNAMICTASK_URL + '/' + dynamic_task.id + '/' + META_TASK_PATH;
    axios.get(url + '.json')
      .then(response => {
        this.setState({
          meta_tasks: response.data.meta_tasks
        })
      this.props.afterClickSendPullRequest(this.state.assignment,
        this.state.dynamic_task, response.data.meta_tasks);
      })
      .catch(error => {
        console.log(error);
      }
    );
  }
}
