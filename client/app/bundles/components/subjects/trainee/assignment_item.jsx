import React from 'react';
import axios from 'axios';
import css from '../subject.scss';
import * as app_constants from 'constants/app_constants';
import * as subject_constants from '../subject_constants';

const ASSIGNMENT_URL = app_constants.APP_NAME + subject_constants.ASSINGMENT_PATH;
const DYNAMICTASK_URL = app_constants.APP_NAME + subject_constants.DYNAMICTASK_PATH;

export default class AssignmentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignment: props.assignment,
      current_user: props.current_user,
      user_dynamic_course_subjects: props.user_dynamic_course_subjects
    };
  }

  render() {
    let {current_user, assignment} = this.state;
    let status_css, menu_action = '';
    if (this.props.status == "finish") {
      status_css = "status-finish";
    } else if (this.props.status == "in_progress") {
      status_css = "status-progress";
      menu_action = <span className="menu-assignment pull-right dropdown-toggle"
        data-toggle="dropdown" onMouseOver={this.menuHover.bind(this)}>
        <i className="fa fa-bars cursor" aria-hidden="true"></i>
        </span>;
    }else {
      status_css = "status-init";
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
          <div className="row title-assignment" onMouseLeave={this.menuOut.bind(this)}>
            <div className="div-status"
              title={`${I18n.t("subjects.assignments.status." + this.props.status)}`}>
              {this.props.status}
              <em className={`status ${status_css} cursor`}></em>
            </div>
            <p className="name">{assignment.name}</p>
            {menu_action}
            <p className="content-assignment">{assignment.content}</p>

            <span className="dropdown-menu pull-right list-menu cursor"
              onMouseLeave={this.menuOut.bind(this)}>
              <li><a href="#" onClick={this.finishAssignment.bind(this)}>Finish Assigment</a></li>
            </span>
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

  menuHover(event) {
    let target = event.target;
    $(target).closest('.title-assignment').addClass('open');
  }

  menuOut(event) {
    let target = event.target;
    $(target).closest('.title-assignment').removeClass('open');
  }

  finishAssignment(event) {
    event.preventDefault();
    axios.get(ASSIGNMENT_URL + "/"+ this.state.assignment.id +".json")
      .then(response => {
        this.props.user_dynamic_course_subjects.map(dynamic_task => {
          if(dynamic_task.targetable_id == response.data.static_task.id) {
            axios.put(DYNAMICTASK_URL + "/" + dynamic_task.id + ".json", {
              dynamic_task: {
                status: "finish"
              }, authenticity_token: ReactOnRails.authenticityToken()
            }, app_constants.AXIOS_CONFIG)
            .then(response => {
              this.props.afterUpdateStatus(response.data.dynamic_task);
            })
            .catch(error => {
              console.log(error);
            })
          }
        })
      })
      .catch(error => {
        console.log(error);
      });
  }
}
