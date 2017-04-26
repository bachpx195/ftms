import ModalBody from '../subjects/subject_form/modalBody';
import ModalTask from '../subjects/subject_form/modalTask';
import TabsMember from './templates/tabs_member';
import TabsTask from './templates/tabs_task';
import TeamPolicy from 'policy/team_policy';
import React from 'react';

export default class ListTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs_group_focus: 1
    }
  }


  renderUserTaskModal() {
    let panelUserTask = null;
    if(this.props.subject_detail.user_subjects &&
      this.props.subject_detail.user_subjects[this.props.user_index]) {
      panelUserTask = (
        <ModalTask task={this.state.subject_detail.tasks}
          user_tasks={this.state.subject_detail
            .user_subjects[this.state.user_index].user_course_task}
          user_index={this.state.user_index}
          ownerable_id={this.state.subject_detail.course_subject.id}
          ownerable_type='CourseSubject'
          subject_detail={this.props.subject_detail}
          handleAfterAddTask={this.props.handleAfterAddTask}
          afterCreateTask={this.props.afterCreateTask}
          user={this.props.user}
          handleAfterDeleteTask={this.props.handleAfterDeleteTask}
        />
      )
    }

    return (
      <div className='modalUser'>
        <div className='modalUserTask modal fade in' role='dialog'>
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
        <div className='modalAddTask modal fade in' role='dialog'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close'
                  data-dismiss='modal'>&times;</button>
                <h4 className='modal-title'>{I18n.t('buttons.add_task')}</h4>
              </div>
              <ModalBody task={this.props.subject_detail.course_subject_task}
                ownerable_id={this.props.team.id}
                ownerable_type='Team' course={this.props.course}
                subject_detail={this.props.subject_detail}
                handleAfterAddTask={this.props.handleAfterAddTask}
                afterCreateTask={this.props.afterCreateTask}
                course_subject_task={this.props.subject_detail.team_task}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='flex-container'>
        <TabsTask
          tabs_group_focus={this.state.tabs_group_focus}
          subject_detail={this.props.subject_detail}
          documents={this.props.documents}
          document_preview={this.props.document_preview}
          onDocumentsDrop={this.props.onDocumentsDrop}
          handleDocumentUploaded={this.props.handleDocumentUploaded}
          handleDocumentDeleted={this.props.handleDocumentDeleted}
          clickPreviewDocument={this.props.clickPreviewDocument}
          handleAfterDeleteTask={this.props.handleAfterDeleteTask}
          handleChooseType={this.props.handleChooseType}
          changeTabsGroupFocus={this.changeTabsGroupFocus.bind(this)} />
        <TabsMember
          tabs_group_focus={this.state.tabs_group_focus}
          subject_detail={this.props.subject_detail}
          statuses={this.props.statuses}
          team={this.props.team}
          course={this.props.course}
          subject={this.props.subject}
          member_evaluations={this.props.member_evaluations}
          training_standard={this.props.training_standard}
          evaluation_template={this.props.evaluation_template}
          evaluation_standards={this.props.evaluation_standards}
          afterAddTaskForUser={this.props.afterAddTaskForUser}
          changeTabsGroupFocus={this.changeTabsGroupFocus.bind(this)} />
        {this.renderUserTaskModal()}
        {this.renderTaskModal()}
      </div>
    );
  }

  changeTabsGroupFocus(new_index_focus) {
    this.setState({
      tabs_group_focus: new_index_focus
    })
  }
}
