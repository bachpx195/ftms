import React from 'react';
import SupervisorSubjectShow from './supervisor/subject_show_box';
import SubjectShowBoxTrainee from './trainee/subject_show_box';

require('../subjects/subject.scss');

export default class SubjectsShowBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: true,
      current_user: props.current_user,
      assigments_of_user_subjects: props.assigments,
      user_dynamic_course_subjects: props.user_dynamic_course_subjects,
      course_subject_id: props.course_subject_id
    }
  }

  render() {
    if (this.state.admin) {
      return (
        <SupervisorSubjectShow course={this.props.course}
          subject={this.props.subject} />
      );
    } else {
      return(
        <SubjectShowBoxTrainee
          course_subject_id={this.state.course_subject_id}
          current_user={this.state.current_user}
          user_dynamic_course_subjects={this.state.user_dynamic_course_subjects}
          assigments_of_user_subjects={this.state.assigments_of_user_subjects}
        />
      );
    }
  }
}
