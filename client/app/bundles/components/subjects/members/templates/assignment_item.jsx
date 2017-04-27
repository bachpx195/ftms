import axios from 'axios';
import css from '../../assets/subject.scss';
import PublicPolicy from 'policy/public_policy';
import React from 'react';
import Update from '../actions/update_assignment'
import * as routes from 'config/routes';

export default class AssignmentItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      assignment: props.assignment,
      subject_detail: props.subject_detail,
      dynamic_task: props.dynamic_task
    };
  }

  render() {
    let current_user = JSON.parse(localStorage.current_user);
    let status = this.props.status;
    let menu_action, update_assignment, send_pull = '';
    if (this.props.status == 'in_progress' || this.props.status == 'init') {
      menu_action =
        <span className='menu-assignment pull-right dropdown-toggle'
          data-toggle='dropdown' >
          <i className='glyphicon glyphicon-align-justify cursor'></i>
        </span>;
      if (this.props.status == 'in_progress') {
        send_pull = <li><a
          onClick={this.sendPullRequest.bind(this)}>{I18n.t('meta_tasks.send_pull')}
          </a></li>
        status = 'progress';
      }
      update_assignment =
        <Update
          status={this.props.status}
          course_subject={this.state.subject_detail.course_subject}
          dynamic_task={this.state.dynamic_task}
          afterUpdateStatus={this.props.afterUpdateStatus} />;
    }
    let meta_types = [];
    if (this.state.assignment.meta_types.length > 0) {
       this.state.assignment.meta_types.map((type, index) => {
        meta_types.push(
          <div className='col-md-3 border-right info' key={index}>
            <i className='fa fa-link' aria-hidden='true'></i>
            {type.name}
          </div>
        )
      })
    } else {
      meta_types.push(
        <div className='col-md-3 info' key={0}>
          <i className='fa fa-link' aria-hidden='true'></i>
        </div>
      )
    }

    return (
      <div className='assignment-item clearfix'>
        <div className='col-md-2 avatar-user'>
          <a>
            <img className='img-circle' src={current_user.avatar.url}
              title={current_user.name}
              alt={I18n.t('subjects.trainee.avatar')} />
          </a>
        </div>

        <div className='col-md-10 info-detail'>
          <div className='row title-assignment'>
            <div className='div-status'
              title={`${I18n.t('subjects.assignments.statuses.' + this.props.status)}`}>
              {this.props.status}
              <em className={`status status-${status} cursor`}></em>
            </div>
            <p className='name'>{this.state.assignment.name}</p>
            <p className='content-assignment'>{this.state.assignment.content}</p>
            <PublicPolicy permit={[{action: ['setUserTeam'], target: 'children',
              data: {course_subject_teams:
              this.state.subject_detail.course_subject_teams}}]}>
              <div>
                {menu_action}
                <ul className='dropdown-menu pull-right list-menu cursor' >
                  {send_pull}
                  {update_assignment}
                </ul>
              </div>
            </PublicPolicy>
          </div>

          <div className='detail row'>
            {meta_types}
          </div>
        </div>
      </div>
    );
  }

  sendPullRequest(event) {
    event.preventDefault();
    this.props.afterClickSendPullRequest(this.state.dynamic_task,
      this.state.assignment)
    $('.modal-send-pull').modal();
  }
}
