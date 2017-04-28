import ModalTask from '../subjects/subject_form/modalTask';
import ModalUserTask from '../subjects/subject_form/modal_user_task';
import React from 'react';
import TabsMember from './templates/tabs_member';
import TabsTask from './templates/tabs_task';
import TeamPolicy from 'policy/team_policy';

export default class ListTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs_group_focus: 1,
      subject_detail: props.subject_detail,
      user_index: props.user_index || 0,
      user: props.user
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      subject_detail: nextProps.subject_detail,
      user_index: nextProps.user_index || 0,
      user: nextProps.user
    })
  }

  renderUserTaskModal() {
    let panelUserTask = null;
    if(this.props.subject_detail.user_subjects &&
      this.props.subject_detail.user_subjects[this.state.user_index]) {
      panelUserTask = (
        <ModalTask task={this.props.subject_detail.tasks}
          user_tasks={this.props.subject_detail
            .user_subjects[this.state.user_index].user_course_task}
          user_index={this.state.user_index}
          ownerable_id={this.props.subject_detail.course_subject.id}
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
    let modal_assign_task = null;
    let modal_list_task = null;
    debugger
    if (this.props.course) {
      if(this.props.subject_detail.user_subjects &&
        this.props.subject_detail.user_subjects[this.state.user_index]) {
        modal_assign_task = (
          <div className='modal-assign modal fade in' role='dialog'>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <button type='button' className='close'
                    data-dismiss='modal'>&times;</button>
                  <h4 className='modal-title'>
                    {I18n.t('subjects.headers.assign_task')}
                  </h4>
                </div>
                <ModalTask task={this.props.subject_detail.course_subject_task}
                  user_tasks={this.props.subject_detail
                    .user_subjects[this.state.user_index].user_course_task}
                  user_index={this.state.user_index}
                  ownerable_id={this.props.subject_detail.course_subject.id}
                  ownerable_type='CourseSubject'
                  subject_detail={this.props.subject_detail}
                  handleAfterAddTask={this.props.handleAfterAddTask}
                  afterCreateTask={this.props.afterCreateTask}
                  user={this.props.user}
                  handleAfterDeleteTask={this.props.handleAfterDeleteTask}
                />
              </div>
            </div>
          </div>
        );

        modal_list_task = (
          <div className='modal-list-task modal fade in' role='dialog'>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <button type='button' className='close'
                    data-dismiss='modal'>&times;</button>
                  <h4 className='modal-title'>
                    {I18n.t('subjects.headers.list_task')}
                  </h4>
                </div>
                  <ModalUserTask task={this.props.subject_detail.course_subject_task}
                    user_tasks={this.props.subject_detail
                      .user_subjects[this.state.user_index].user_course_task}
                    user_index={this.state.user_index}
                    ownerable_id={this.props.subject_detail.course_subject.id}
                    ownerable_type='CourseSubject'
                    subject_detail={this.props.subject_detail}
                    handleAfterAddTask={this.props.handleAfterAddTask}
                    afterCreateTask={this.props.afterCreateTask}
                    user={this.props.user}
                    handleAfterDeleteTask={this.props.handleAfterDeleteTask}
                  />
              </div>
            </div>
          </div>
        );
      }
    }
    return(
      <div className='modalUser'>
        {modal_assign_task}
        {modal_list_task}
      </div>
    )
  }

  render() {
    let creator_id_program = this.props.course.program.creator.id;
    let owner_id_organization = this.props.course.program.organization.owner.id;
    let owner_id_course = this.props.course.owner.id;
    return (
      <TeamPolicy permit={
        [{action: ['owner'], target: 'children',
          data: {owner_id_course: owner_id_course, 
            creator_id_program: creator_id_program,
            owner_id_organization: owner_id_organization}}]}
      >
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
      </TeamPolicy>
    );
  }

  changeTabsGroupFocus(new_index_focus) {
    this.setState({
      tabs_group_focus: new_index_focus
    })
  }
}
