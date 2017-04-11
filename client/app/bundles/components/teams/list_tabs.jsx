import React from 'react';
import ModalTask from '../subjects/subject_form/modalTask';
import ModalBody from '../subjects/subject_form/modalBody';
import TabsContent from './tabs_content';
import TeamPolicy from 'policy/team_policy';

export default class ListTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject_detail: props.subject_detail,
      user: props.user,
      user_index: props.user_index,
      member_evaluations: props.member_evaluations
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      subject_detail: nextProps.subject_detail,
      user: nextProps.user,
      user_index: nextProps.user_index,
      member_evaluations: nextProps.member_evaluations
    });
  }

  render() {
    return (
      <div className='blocks'>
        <div className='col-md-12'>
          <ul className='nav nav-tabs tab-bar'>
            <TeamPolicy permit={
              [{action: ['owner'], target: 'children', 
                  data: {owner_id: this.props.course.owner_id}}]}
            >
              <li className='active'>
                <a data-toggle='tab' href='#user-subject' className='tab-header'>
                  <i className='fa fa-file-text-o'></i>
                    {this.props.team.name}
                </a>
              </li>
            </TeamPolicy>
            <li>
              <a data-toggle='tab' href='#surveys'>
                <div className='custom-subjects-titles'>
                  <i className='fa fa-file-text-o'></i>
                  {I18n.t('subjects.titles.surveys')}
                </div>
              </a>
            </li>
            <li>
              <a data-toggle='tab' href='#assignments'>
                <div className='custom-subjects-titles'>
                  <i className='fa fa-pencil-square-o'></i>
                  {I18n.t('subjects.titles.assignments')}
                </div>
              </a>
            </li>
            <li>
              <a data-toggle='tab' href='#test-rules'>
                <div className='custom-subjects-titles'>
                  <i className='fa fa-check-square-o'></i>
                  {I18n.t('subjects.titles.tests')}
                </div>
              </a>
            </li>
            <li>
              <a data-toggle='tab' href='#projects'>
                <div className='custom-subjects-titles'>
                  <i className='fa fa-check-square-o'></i>
                  {I18n.t('subjects.titles.projects')}
                </div>
              </a>
            </li>
            <li>
              <a data-toggle='tab' href='#tab-documents' className='tab-header'>
                <i className='fa fa-file-pdf-o'></i>
                {I18n.t('subjects.titles.documents')}
              </a>
            </li>
          </ul>
        </div>
        <TabsContent team={this.props.team} course={this.props.course}
          subject_detail={this.state.subject_detail}
          statuses={this.props.statuses}
          handleAfterDeleteTask={this.props.handleAfterDeleteTask}
          afterAddTaskForUser={this.props.afterAddTaskForUser}
          training_standard={this.props.training_standard}
          evaluation_template={this.props.evaluation_template}
          evaluation_standards={this.props.evaluation_standards}
          member_evaluations={this.state.member_evaluations}
          subject={this.props.subject} documents={this.props.documents}
          document_preview={this.props.document_preview}
          onDocumentsDrop={this.props.onDocumentsDrop}
          handleDocumentUploaded={this.props.handleDocumentUploaded}
          handleDocumentDeleted={this.props.handleDocumentDeleted}
          clickPreviewDocument={this.props.clickPreviewDocument} />
        {this.renderUserTaskModal()}
        {this.renderTaskModal()}
      </div>
    );
  }

  renderUserTaskModal() {
    let panelUserTask = null;
    if(this.state.subject_detail.user_subjects &&
      this.state.subject_detail.user_subjects[this.state.user_index]) {
      panelUserTask = (
        <ModalTask task={this.state.subject_detail.team_task}
          user_tasks={this.state.subject_detail
            .user_subjects[this.state.user_index].user_course_task}
          user_index={this.state.user_index}
          ownerable_id={this.state.subject_detail.course_subject.id}
          ownerable_type='Team'
          subject_detail={this.state.subject_detail}
          handleAfterAddTask={this.props.handleAfterAddTask}
          afterCreateTask={this.props.afterCreateTask}
          user={this.state.user}
          handleAfterDeleteTask={this.props.handleAfterDeleteTask}
        />
      )
    }

    return (
      <div className='modalUser'>
        <div id='modalUserTask' className='modal fade in' role='dialog'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close'
                  data-dismiss='modal'>&times;</button>
                <h4 className='modal-title'>
                  {I18n.t('subjects.headers.list_task')}
                </h4>
              </div>
              {panelUserTask}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderTaskModal() {
    return(
      <div className='modal-task'>
        <div id='modalAddTask' className='modal fade in' role='dialog'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close'
                  data-dismiss='modal'>&times;</button>
                <h4 className='modal-title'>{I18n.t('buttons.add_task')}</h4>
              </div>
              <ModalBody task={this.state.subject_detail.course_subject_task}
                ownerable_id={this.props.team.id}
                ownerable_type='Team' course={this.props.course}
                subject_detail={this.state.subject_detail}
                handleAfterAddTask={this.props.handleAfterAddTask}
                afterCreateTask={this.props.afterCreateTask}
                course_subject_task={this.state.subject_detail.team_task}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
