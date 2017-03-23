import React from 'react';
import axios from 'axios';
import css from '../subject.scss';
import * as app_constants from 'constants/app_constants';

export default class AssignmentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignment: props.assignment,
      current_user: props.current_user
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      assignment: nextProps.assignment,
      current_user: nextProps.current_user
    })
  }

  render() {
    let {current_user, assignment} = this.state
    return (
      <div className="assigment_item clearfix">
        <div className="col-md-2 avatar_user">
          <a href="#">
            <img className="img-circle" src={current_user.avatar.url}
              title={current_user.name}
              alt={I18n.t("subjects.trainee.avatar")} />
          </a>
        </div>
        <div className="col-md-10">
          <div className="row title_assignment">
            <span className="name">{assignment.name}</span>
            <span className="content">{assignment.content}</span>
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
}
