import axios from 'axios';
import css from '../assets/subject.scss';
import ModalCreateAssignment from '../../assignments/templates/modal';
import ModalSendPull from './templates/send_pull';
import React from 'react';
import SubjectDetail from './templates/subject_detail';
import * as routes from 'config/routes';

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
      meta_tasks: []
    };
  }

  render() {
    return (
      <div className='row subjects admin-subjects'>
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
          subject_detail={this.props.subject_detail}
          afterCreateTask={this.afterCreateTask.bind(this)}
          url={routes.assignments_url()}
        />
        <ModalSendPull
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

  afterCreateTask(target, type) {
    $('.modal-create-assignment').modal('hide');
    this.state.assigments_of_user_subjects.push(target.assignment)
    this.state.static_task_assignment.push(target.static_task)
    this.state.user_dynamic_course_subjects.push(target.dynamic_task)

    this.setState({
      assigments_of_user_subjects: this.state.assigments_of_user_subjects,
      static_task_assignment: this.state.static_task_assignment,
      user_dynamic_course_subjects: this.state.user_dynamic_course_subjects
    });
  }

  afterSendPull(metaTask) {
    this.state.meta_tasks.push(metaTask);
    this.setState({
      meta_tasks: this.state.meta_tasks
    })
  }

  afterClickSendPullRequest(assignment, dynamic_task, meta_tasks) {
    this.setState({
      assignment: assignment,
      dynamic_task: dynamic_task,
      meta_tasks: meta_tasks
    });
  }
}