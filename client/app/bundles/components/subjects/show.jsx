import axios from 'axios';
import css from './assets/subject.scss';
import React from 'react';
import SubjectManager from './templates/subject_manager';
import SubjectTrainee from './templates/subject_trainee';

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
      meta_types: props.meta_types
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
          organizations={this.props.organizations}
          meta_types={this.state.meta_types}
        />
      );
    } else {
      return(
        <SubjectTrainee
          subject_detail={this.state.subject_detail}
          user_dynamic_course_subjects={this.state.user_dynamic_course_subjects}
          assigments_of_user_subjects={this.state.assigments_of_user_subjects}
          static_task_assignment={this.state.static_task_assignment}
          static_test_rules={this.props.static_test_rules}
          user_dynamic_tasks={this.props.user_dynamic_tasks}
        />
      );
    }
  }
}
