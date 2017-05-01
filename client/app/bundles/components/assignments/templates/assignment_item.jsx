import axios from 'axios';
import css from '../../subjects/assets/subject.scss';
import PublicPolicy from 'policy/public_policy';
import React from 'react';
import Update from '../actions/update';
import * as routes from 'config/routes';

export default class AssignmentItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      assignment: props.assignment,
      subject_detail: props.subject_detail,
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
    let menu_action, update_assignment, submit_task = '';
    if (this.props.status == 'in_progress' || this.props.status == 'init') {
      menu_action =
        <span className="menu-assignment pull-right dropdown-toggle"
          data-toggle="dropdown" >
          <i className="glyphicon glyphicon-align-justify cursor"></i>
        </span>;
      if (this.props.status == 'in_progress') {
        submit_task = <li><a onClick={this.sendPullRequest.bind(this)}>
          {I18n.t('meta_tasks.submit_task')}
        </a></li>;
        status = 'progress';
      }
      update_assignment =
        <Update
          status={this.props.status}
          course_subject={this.state.subject_detail.course_subject}
          dynamic_task={this.state.dynamic_task}
          afterUpdateStatus={this.props.afterUpdateStatus} />;
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
              data: {course_subject_teams:
              this.state.subject_detail.course_subject_teams}}]}>
              <div>
                {menu_action}
                <ul className="dropdown-menu pull-right list-menu cursor" >
                  {submit_task}
                  {update_assignment}
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

  sendPullRequest(event) {
    event.preventDefault();
    this.props.afterClickSendPullRequest(this.state.dynamic_task,
      this.state.assignment);
    $('.modal-send-pull').modal();
  }
}
