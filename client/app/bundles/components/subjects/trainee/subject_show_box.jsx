import React from 'react';
import axios from 'axios';
import css from '../subject.scss';
import ModalSendPull from '../meta_tasks/send_pull';

import AssignmentItem from './assignment_item';
import FormTask from '../subject_form/form_task'

import * as app_constants from 'constants/app_constants';
import * as subject_constants from '../subject_constants';

const ASSIGNMENT_URL = app_constants.APP_NAME + subject_constants.ASSIGNMENT_PATH;

export default class SubjectShowBoxTrainee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assigments_of_user_subjects: props.assigments_of_user_subjects,
      current_user: props.current_user,
      course_subject: props.course_subject,
      user_dynamic_course_subjects: props.user_dynamic_course_subjects,
      course_subject_teams: props.course_subject_teams,
      status: "init",
      static_task_assignment: props.static_task_assignment,
      dynamic_task: '',
      assignment: '',
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
      static_task_assignment: nextProps.static_task_assignment
    });
  }

  render() {
    return (
      <div className='row subjects admin-subjects'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool"
                  data-widget="collapse">
                  <i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool"
                  data-widget="remove">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>

            <div className='box-body no-padding'>
              <div className='row'>
                <div className='col-md-8'>
                  <div className="assignment-box">
                    <h1 className="header-task">
                      {I18n.t("subjects.trainee.title_assignment")}
                      <span className="label label-danger label-header">
                        {I18n.t("subjects.assignments.total_task",
                          {total: this.state.assigments_of_user_subjects.length})}
                      </span>

                      <button type='button' className="pull-right btn btn-info"
                        onClick={this.afterClickCreateAssignment.bind(this)}>
                        {I18n.t("subjects.trainee.create_assignments")}
                      </button>
                    </h1>
                    {this.renderAssignment()}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="member_user_course">

                  </div>
                </div>
              </div>
            </div>

            <div className='box-footer'>
            </div>
          </div>
        </div>
        {this.renderModal()}
        <ModalSendPull
          dynamic_task={this.state.dynamic_task}
          assignment={this.state.assignment}
          meta_tasks={this.state.meta_tasks}
          afterSendPull={this.afterSendPull.bind(this)}
        />
      </div>
    );
  }

  renderAssignment() {
    return this.state.assigments_of_user_subjects.map(assignment => {
      let status= '';
      let tmp_dynamic_task = '';

      let index_static_task = this.state.static_task_assignment.findIndex(
        static_task => static_task.targetable_id == assignment.id)

      this.state.user_dynamic_course_subjects.map(dynamic_task => {
        if (dynamic_task.targetable_id ==
          this.state.static_task_assignment[index_static_task].id) {
          status = dynamic_task.status;
          tmp_dynamic_task = dynamic_task;
        }
      })
      return <AssignmentItem
        key={assignment.id}
        status={status}
        course_subject_teams={this.state.course_subject_teams}
        current_user={this.state.current_user}
        assignment={assignment}
        course_subject={this.state.course_subject}
        user_dynamic_course_subjects={this.state.user_dynamic_course_subjects}
        afterUpdateStatus={this.afterUpdateStatus.bind(this)}
        static_task_assignment={this.state.static_task_assignment}
        dynamic_task={tmp_dynamic_task}
        afterClickSendPullRequest={this.afterClickSendPullRequest.bind(this)}
      />
    })
  }

  renderModal() {
    let course_subject_id = '';
    if (this.state.course_subject) {
      course_subject_id = this.state.course_subject.id
    }
    let modalCreateAssignment = (
      <div id='modalCreateAssignment' className='modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>
                {I18n.t("subjects.trainee.create_assignments")}</h4>
            </div>
            <div className="modal-body">
              <FormTask type={this.state.type}
                ownerable_id={course_subject_id}
                ownerable_type={this.props.ownerable_type}
                afterCreateTask={this.afterCreateTask.bind(this)}
                subject_detail={this.props.subject_detail}
                course={this.props.course}
                user={this.state.current_user}
                url={ASSIGNMENT_URL} />
            </div>
          </div>
        </div>
      </div>
    )
    return(
      <div className='create_assignments'>
        {modalCreateAssignment}
      </div>
    )
  }

  afterClickCreateAssignment() {
    $('#modalCreateAssignment').modal();
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
    $('#modalCreateAssignment').modal('hide');
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
