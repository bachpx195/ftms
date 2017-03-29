import React from 'react';
import axios from 'axios';
import css from '../subject.scss';
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
      user_dynamic_course_subjects: props.user_dynamic_course_subjects,
      status: "init",
      course_subject_id: props.course_subject_id
    };
  }

  render() {
    return (
      <div className='row subjects admin-subjects'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse">
                  <i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>

            <div className='box-body no-padding'>
              <div className='row'>
                <div className='col-md-8'>
                  <div className="assignment-box">
                    <h1 className="header-task">{I18n.t("subjects.trainee.title_assignment")}
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
      </div>
    );
  }

  renderAssignment() {
    return this.state.assigments_of_user_subjects.map(assignment => {
      let status = '';
      this.state.user_dynamic_course_subjects.map(dynamic_task => {
        if (dynamic_task.targetable_id == assignment.id) {
          status = dynamic_task.status;
        }
      })
      return <AssignmentItem
        key={assignment.id}
        status={status}
        current_user={this.state.current_user}
        assignment={assignment}
        user_dynamic_course_subjects={this.state.user_dynamic_course_subjects}
        afterUpdateStatus={this.afterUpdateStatus.bind(this)}
      />
    })
  }

  renderModal() {
    let modalCreateAssignment = (
      <div id='modalCreateAssignment' className='modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{I18n.t("subjects.trainee.create_assignments")}</h4>
            </div>
            <div className="modal-body">
              <FormTask type={this.state.type}
                ownerable_id={this.state.course_subject_id}
                ownerable_type={this.props.ownerable_type}
                afterCreateTask={this.afterCreateTask.bind(this)}
                subject_detail={this.props.subject_detail}
                course={this.props.course} user={this.state.current_user}
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
    this.state.assigments_of_user_subjects.push(target)
    this.setState({
      assigments_of_user_subjects: this.state.assigments_of_user_subjects
    });
  }
}
