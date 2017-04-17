import axios from 'axios';
import css from './assets/subject.scss';
import React from 'react';
import SubjectManager from './templates/subject_manager';
import SubjectTrainee from './templates/subject_trainee';
import * as app_constants from 'constants/app_constants';
import * as subject_constants from './constants/subject_constants';

const COURSE_URL = app_constants.APP_NAME + subject_constants.COURSE_PATH;
const SUBJECT_URL = app_constants.APP_NAME + subject_constants.SUBJECT_PATH;

export default class SubjectsShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      admin: this.setAdmin(),
      course_subject_teams: [],
      user_subjects: props.user_subjects,
      assigments_of_user_subjects: props.assigments,
      user_dynamic_course_subjects: props.user_dynamic_course_subjects,
      course_subject: props.course_subject,
      static_task_assignment: props.static_task_assignment,
      member_evaluations: props.member_evaluations,
      subject_detail: props.subject_detail,
    }
  }

  setAdmin() {
    let current_user = JSON.parse(localStorage.current_user);
    var result = true;
    if (!this.props.member_ids || this.props.member_ids.length == 0) {
      return result;
    }
    for(var member_id of this.props.member_ids) {
      if(member_id == current_user.id) {
        result = false;
        break;
      }
    }
    return result;
  }

  render() {
    if (this.state.admin) {
      return (
        <SubjectManager course={this.props.course}
          subject={this.props.subject}
          subject_detail={this.state.subject_detail}
          course_subject_teams={this.state.subject_detail.course_subject_teams}
          training_standard={this.props.training_standard}
          evaluation_template={this.props.evaluation_template}
          evaluation_standards={this.props.evaluation_standards}
          member_evaluations={this.state.member_evaluations}
          member_ids={this.props.member_ids}
          organizations={this.props.organizations} />
      );
    } else {
      return(
        <SubjectTrainee
          subject_detail={this.state.subject_detail}
          user_dynamic_course_subjects={this.state.user_dynamic_course_subjects}
          assigments_of_user_subjects={this.state.assigments_of_user_subjects}
          static_task_assignment={this.state.static_task_assignment}
        />
      );
    }
  }
}