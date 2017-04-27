import * as routes from 'config/routes';
import axios from 'axios';
import css from '../assets/subject.scss';
import ModalCreateAssignment from '../managers/templates/modal_create_assignment';
import ModalSubmitTask from './templates/submit_task';
import React from 'react';
import ShowBreadCrumb from './templates/bread_crumb/show';
import SubjectDetail from './templates/subject_detail';

export default class SubjectTraineeShowBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject_detail: props.subject_detail,
      assigments_of_user_subjects: props.assigments,
      user_dynamic_course_subjects: props.user_dynamic_course_subjects,
      static_task_assignment: props.static_task_assignment,
      static_test_rules: props.static_test_rules,
      dynamic_task: '',
      assignment: '',
      user_dynamic_tasks: props.user_dynamic_tasks,
      meta_tasks: [],
      meta_types: props.meta_types || []
    };
  }

  render() {
    return (
      <div className='row subjects admin-subjects'>
        <ShowBreadCrumb
          course={this.props.course}
          program={this.state.subject_detail.program}
          organization={this.state.subject_detail.organization}
          subject={this.props.subject_detail}
        />

        <SubjectDetail
          subject_detail={this.state.subject_detail}
          assigments_of_user_subjects={this.state.assigments_of_user_subjects}
          static_task_assignment={this.state.static_task_assignment}
          user_dynamic_course_subjects={this.state.user_dynamic_course_subjects}
          afterUpdateStatus={this.afterUpdateStatus.bind(this)}
          afterClickSendPullRequest={this.afterClickSendPullRequest.bind(this)}
          static_test_rules={this.props.static_test_rules}
        />

        <ModalCreateAssignment
          ownerable_id={this.state.subject_detail.course_subject.id}
          ownerable_type={"CourseSubject"}
          subject_detail={this.props.subject_detail}
          url={routes.assignments_url()}
          handleAfterCreatedAssignment={this.handleAfterCreatedAssignment.bind(this)}
          meta_types={this.state.meta_types}
          subject={this.props.subject}
          permit_create_meta_type={this.props.permit_create_meta_type}
        />

        <ModalSubmitTask
          dynamic_task={this.state.dynamic_task}
          assignment={this.state.assignment}
          meta_tasks={this.state.meta_tasks}
          afterSendPull={this.afterSendPull.bind(this)}
        />
      </div>
    );
  }

  afterUpdateStatus(dynamic_task) {
    let index = _.findIndex(this.state.user_dynamic_course_subjects, value => {
      return value.id == dynamic_task.id
    })
    this.state.user_dynamic_course_subjects[index] = dynamic_task;
    this.setState({
      user_dynamic_course_subjects: this.state.user_dynamic_course_subjects
    })
  }

  handleAfterCreatedAssignment(target) {
    this.state.assigments_of_user_subjects.push(target.assignment)
    this.state.static_task_assignment.push(target.static_task)
    this.state.user_dynamic_course_subjects.push(target.dynamic_task)
    this.state.user_dynamic_tasks.push(target.dynamic_task)

    this.setState({
      assigments_of_user_subjects: this.state.assigments_of_user_subjects,
      static_task_assignment: this.state.static_task_assignment,
      user_dynamic_course_subjects: this.state.user_dynamic_course_subjects,
      user_dynamic_tasks: this.state.user_dynamic_tasks
    });
  }

  afterSendPull(meta_tasks) {
    let index = _.findIndex(this.state.user_dynamic_tasks, value => {
      return value.id == dynamic_task.id
    })
    this.state.user_dynamic_tasks[index].meta_tasks = meta_tasks
    this.setState({
      user_dynamic_tasks: this.state.user_dynamic_tasks
    })
  }

  afterClickSendPullRequest(dynamic_task, assignment) {
    let index = _.findIndex(this.state.user_dynamic_tasks, value => {
      return value.id == dynamic_task.id
    })

    this.setState({
      assignment: assignment,
      dynamic_task: dynamic_task,
      meta_tasks: this.state.user_dynamic_tasks[index].meta_tasks
    });
  }
}
