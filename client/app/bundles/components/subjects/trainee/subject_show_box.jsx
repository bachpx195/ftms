import React from 'react';
import axios from 'axios';
import css from '../subject.scss';
import AssignmentItem from './assignment_item';
import * as app_constants from 'constants/app_constants';

export default class SubjectShowBoxTrainee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assigments_of_user_subjects: props.assigments_of_user_subjects,
      current_user: props.current_user,
      user_dynamic_course_subjects: props.user_dynamic_course_subjects,
      status: "init"
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

  afterUpdateStatus(dynamic_task) {
    let index = _.findIndex(this.state.user_dynamic_course_subjects, value => {
      return value.id == dynamic_task.id
    })
    this.state.user_dynamic_course_subjects[index] = dynamic_task;
    this.setState({
      user_dynamic_course_subjects: this.state.user_dynamic_course_subjects
    })
  }
}
