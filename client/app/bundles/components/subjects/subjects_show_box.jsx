import React from 'react';
import axios from 'axios';
import SupervisorSubjectShow from './supervisor/subject_show_box';
import SubjectShowBoxTrainee from './trainee/subject_show_box';
import * as app_constants from 'constants/app_constants';
import * as subject_constants from './subject_constants';

const COURSE_URL = app_constants.APP_NAME + subject_constants.COURSE_PATH;
const SUBJECT_URL = app_constants.APP_NAME + subject_constants.SUBJECT_PATH;

require('./subject.scss');

export default class SubjectsShowBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: this.setAdmin(),
      course_subject_teams: [],
      user_subjects: props.user_subjects,
      current_user: props.current_user,
      assigments_of_user_subjects: props.assigments,
      user_dynamic_course_subjects: props.user_dynamic_course_subjects,
      course_subject: props.course_subject,
      static_task_assignment: props.static_task_assignment,
      member_evaluations: props.member_evaluations,
      subject_detail: props.subject_detail,
      user: {},
      user_index: 0
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
        <SupervisorSubjectShow course={this.props.course}
          subject={this.props.subject}
          subject_detail={this.state.subject_detail}
          course_subject_teams={this.state.subject_detail.course_subject_teams}
          training_standard={this.props.training_standard}
          evaluation_template={this.props.evaluation_template}
          evaluation_standards={this.props.evaluation_standards}
          member_evaluations={this.state.member_evaluations}
          member_ids={this.props.member_ids} />
      );
    } else {
      return(
        <SubjectShowBoxTrainee
          course_subject_teams={this.state.subject_detail.course_subject_teams}
          course_subject={this.state.course_subject}
          current_user={this.state.current_user}
          user_subjects={this.state.subject_detail.user_subjects}
          user_dynamic_course_subjects={this.state.user_dynamic_course_subjects}
          assigments_of_user_subjects={this.state.assigments_of_user_subjects}
          static_task_assignment={this.state.static_task_assignment}
        />
      );
    }
  }
}
