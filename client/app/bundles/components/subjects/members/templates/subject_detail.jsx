import AssignmentItem from './assignment_item';
import css from '../../assets/subject.scss';
import React from 'react';
import PublicPolicy from 'policy/public_policy';
import StartExamButton from './start_exam_button';

export default class SubjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject_detail: props.subject_detail,
      assigments_of_user_subjects: props.assigments_of_user_subjects,
      user_dynamic_course_subjects: props.user_dynamic_course_subjects,
      static_task_assignment: props.static_task_assignment,
    };
  }

  render() {
    let course_subject_teams = this.state.subject_detail.course_subject_teams;
    return (
      <div className='col-md-12'>
        <div className='box box-success'>
          <div className='box-header with-border'>
          <h3 className="box-title">
            {this.state.subject_detail.name}
          </h3>
            <div className='box-tools pull-right'>
              <button type='button' className='btn btn-box-tool'
                data-widget='collapse'>
                <i className='fa fa-minus'></i>
              </button>
              <button type='button' className='btn btn-box-tool'
                data-widget='remove'>
                <i className='fa fa-times'></i>
              </button>
            </div>
          </div>
          <div className='box-body no-padding'>
            <div className='row'>
              <div className='col-md-8'>
                <StartExamButton test_rules={this.props.static_test_rules}
                  course_subject={this.state.subject_detail.course_subject} />
                <div className='clearfix'></div>
                <div className='assignment-box'>
                  <h1 className='header-task'>
                    {I18n.t('subjects.trainee.title_assignment')}
                    <span className='label label-danger label-header'>
                      {I18n.t('subjects.assignments.total_task',
                        {total: this.state.assigments_of_user_subjects.length})}
                    </span>
                    <PublicPolicy permit={[{action: ['setUserTeam'], target: 'children',
                      data: {course_subject_teams: course_subject_teams}}]}>
                      <button type='button' className='pull-right btn btn-info'
                        onClick={this.handleClickButton.bind(this)}>
                        {I18n.t('subjects.trainee.create_assignments')}
                      </button>
                    </PublicPolicy>
                  </h1>
                  {this.renderAssignment()}
                </div>
              </div>
              <div className='col-md-4'>
                <div className='member_user_course'>
                </div>
              </div>
            </div>
          </div>
          <div className='box-footer'>
          </div>
        </div>
      </div>
    );
  }

  handleClickButton(event) {
    $('.modal-create-assignment').modal();
  }

  renderAssignment() {
    return this.state.assigments_of_user_subjects.map((assignment, index) => {
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

      return <AssignmentItem key={index} status={status}
        subject_detail={this.state.subject_detail}
        assignment={assignment} dynamic_task={tmp_dynamic_task}
        user_dynamic_course_subjects={this.state.user_dynamic_course_subjects}
        static_task_assignment={this.state.static_task_assignment}
        afterUpdateStatus={this.props.afterUpdateStatus}
        afterClickSendPullRequest={this.props.afterClickSendPullRequest}
      />
    })
  }
}
