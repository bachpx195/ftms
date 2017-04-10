import React from 'react';
import axios from 'axios';
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
      current_user: props.current_user,
      course_subject_teams: props.course_subject_teams,
      user_dynamic_course_subjects: props.user_dynamic_course_subjects,
      course_subject: props.course_subject,
      dynamic_task: props.dynamic_task,
      meta_tasks: []
    };
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      assigments_of_user_subjects: nextProps.assigments_of_user_subjects,
      user_dynamic_course_subjects: nextProps.user_dynamic_course_subjects,
      course_subject: nextProps.course_subject,
      course_subject_teams: nextProps.course_subject_teams,
      current_user: nextProps.current_user,
      assignment: nextProps.assignment,
      dynamic_task: nextProps.dynamic_task,
      meta_tasks: nextProps.meta_tasks
    });
  }

  render() {
    let {current_user, assignment} = this.state;
    let status_css,menu_action,receive_option, finish_option, send_pull = '';
    if (this.props.status == "finish") {
      status_css = "status-finish";
    } else if (this.props.status == "reject") {
      status_css = "status-reject";
    } else if (this.props.status == "in_progress") {
      status_css = "status-progress";
      menu_action =
        <span className="menu-assignment pull-right dropdown-toggle"
          data-toggle="dropdown" >
          <i className="glyphicon glyphicon-align-justify cursor"></i>
        </span>;
      finish_option = <li><a href="#"
        onClick={this.finishAssignment.bind(this)}>
        {I18n.t("meta_tasks.finish_assigment")}</a></li>;

      send_pull = <li><a href="#"
        onClick={this.sendPullRequest.bind(this)}>{I18n.t("meta_tasks.send_pull")}
        </a></li>
    } else {
      status_css = "status-init";
      menu_action =
        <span className="menu-assignment pull-right dropdown-toggle"
          data-toggle="dropdown" >
          <i className="glyphicon glyphicon-align-justify cursor"></i>
        </span>;
      receive_option = <li><a href="#"
        onClick={this.receiveAssignment.bind(this)}>
        {I18n.t("meta_tasks.receive_assignment")}</a></li>;
    }
    return (
      <div className="assignment-item clearfix">
        <div className="col-md-2 avatar-user">
          <a href="#">
            <img className="img-circle" src={current_user.avatar.url}
              title={current_user.name}
              alt={I18n.t("subjects.trainee.avatar")} />
          </a>
        </div>

        <div className="col-md-10 info-detail">
          <div className="row title-assignment">
            <div className="div-status"
              title={`${I18n.t("subjects.assignments.statuses." + this.props.status)}`}>
              {this.props.status}
              <em className={`status ${status_css} cursor`}></em>
            </div>
            <p className="name">{assignment.name}</p>
            <p className="content-assignment">{assignment.content}</p>
            {menu_action}
            <ul className="dropdown-menu pull-right list-menu cursor" >
              {send_pull}
              {receive_option}
              {finish_option}
            </ul>
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

  receiveAssignment(event) {
    event.preventDefault();
    let course_subject = this.state.course_subject;

    axios.put(DYNAMICTASK_URL + "/" + this.state.dynamic_task.id + ".json", {
      course_subject: course_subject,
      dynamic_task: {
        status: "in_progress",
        team_status: "reject"
      }, authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      this.props.afterUpdateStatus(response.data.dynamic_task);
    })
    .catch(error => {
      console.log(error);
    })
  }

  finishAssignment(event) {
    event.preventDefault();
    let course_subject = this.state.course_subject;

    axios.put(DYNAMICTASK_URL + "/" + this.state.dynamic_task.id + ".json", {
      course_subject: course_subject,
      dynamic_task: {
        status: "finish",
        team_status: "finish"
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
    let url = DYNAMICTASK_URL + "/" + dynamic_task.id + "/" + META_TASK_PATH;
    axios.get(url + ".json")
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
