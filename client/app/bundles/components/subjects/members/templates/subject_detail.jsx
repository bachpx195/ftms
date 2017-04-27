import AssignmentItem from './assignment_item';
import css from '../../assets/subject.scss';
import Documents from '../partials/documents';
import ModalPreviewDocument from '../../../shareds/modal_preview_document';
import React from 'react';
import PublicPolicy from 'policy/public_policy';
import StartExamButton from './start_exam_button';
import StatisticTask from './statistic_task';
import Users from '../partials/users';

export default class SubjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject_detail: props.subject_detail,
      assigments_of_user_subjects: props.assigments_of_user_subjects,
      user_dynamic_course_subjects: props.user_dynamic_course_subjects,
      static_task_assignment: props.static_task_assignment,
      is_show: true
    };
  }

  render() {
    let course_subject_teams = this.state.subject_detail.course_subject_teams;
    let action;
    if (this.state.is_show) {
      action = I18n.t('subjects.contents.show_more');
    } else {
      action = I18n.t('subjects.contents.close');
    }
    let show_content;
    if (this.state.subject_detail.description) {
      show_content = this.state.subject_detail.description;
    } else {
      show_content = I18n.t('subjects.titles.nothing_to_show');
    }

    return (
      <div className='col-md-12'>
        <div className='subject-detail'>
          <div className='title'>
            <h3 className='box-title'>
                {this.state.subject_detail.name}
            </h3>
            <div className='subject-status clearfix'>
              <span className={`status ` +
                this.state.subject_detail.user_subjects.status}>
                {I18n.t(`courses.${this.state.subject_detail.user_subjects.status}`)}
              </span>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-9 block-user-task'>
              <div className='description'>
                <div className='box-content'>
                  <div className='pull-left title'>
                    {I18n.t('subjects.titles.content')}
                  </div>
                  <div className='pull-right'>
                    <a href='#show-content' className='text'
                      data-toggle='collapse'>
                      {action}</a>
                  </div>
                  <div className='clearfix'></div>
                </div>
                <div id='show-content' className='collapse show-panel'>
                  {show_content}
                </div>
              </div>
              <div className='clearfix'></div>
              <div className='assignment-box'>
                <div className='list-assignment'>
                  <h1 className='header-task'>
                    {I18n.t('subjects.trainee.title_assignment')}
                    <span className='label label-danger label-header'>
                      {I18n.t('subjects.assignments.total_task',
                        {total: this.state.assigments_of_user_subjects.length})}
                    </span>
                    <PublicPolicy permit={[{action: ['setUserTeam'], target: 'children',
                      data: {course_subject_teams: course_subject_teams}}]}>
                      <button type='button' className='pull-right btn btn-info'
                        onClick={this.handleButtonCreateAssignment.bind(this)}>
                        {I18n.t('subjects.trainee.create_assignments')}
                      </button>
                    </PublicPolicy>
                  </h1>
                  {this.renderAssignment()}
                  <StartExamButton test_rules={this.props.static_test_rules}
                    course_subject={this.state.subject_detail.course_subject} />
                </div>
              </div>
            </div>
            <div className='col-md-3'>
              <div className='member_user_course'>
                <Users
                  subject_detail={this.state.subject_detail}
                />
              </div>
              <div className='statistic-task'>
                <StatisticTask statistic={this.state.subject_detail.statistics}
                  subject={this.state.subject_detail}
                  length={this.state.subject_detail.tasks.length}
                />
              </div>
              <div className='document'>
                <Documents clickPreviewDocument={this.clickPreviewDocument.bind(this)}
                  documents={this.state.subject_detail.documents}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleButtonCreateAssignment(event) {
    $('.modal-create-assignments').modal();
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

      return <AssignmentItem
        key={index}
        status={status}
        subject_detail={this.state.subject_detail}
        assignment={assignment}
        dynamic_task={tmp_dynamic_task}
        user_dynamic_course_subjects={this.state.user_dynamic_course_subjects}
        static_task_assignment={this.state.static_task_assignment}
        afterUpdateStatus={this.props.afterUpdateStatus}
        afterClickSendPullRequest={this.props.afterClickSendPullRequest}
      />
    })
  }

  clickPreviewDocument(document) {
    this.setState({document_preview: document});
    $('.modal-preview-document').modal();
  }
}
