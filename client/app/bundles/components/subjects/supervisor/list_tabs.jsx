import ModalBody from '../subject_form/modalBody';
import ModalTask from '../subject_form/modalTask';
import TabsMember from './tabs_member';
import TabsTask from './tabs_task';
import React from 'react';

export default class ListTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject_detail: props.subject_detail,
      course_subject_teams: props.course_subject_teams,
      user: props.user,
      user_index: props.user_index,
      member_evaluations: props.member_evaluations,
      meta_types: props.meta_types,
      tabs_group_focus: 1,
      type: props.type
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      subject_detail: nextProps.subject_detail,
      course_subject_teams: nextProps.course_subject_teams,
      user: nextProps.user,
      user_index: nextProps.user_index,
      member_evaluations: nextProps.member_evaluations,
      meta_types: nextProps.meta_types,
      type: nextProps.type
    });
  }

  render() {
    if (this.props.course) {
      return (
        <div className="flex-container">
          <TabsTask
            course={this.props.course}
            subject_detail={this.state.subject_detail}
            handleAfterDeleteTask={this.props.handleAfterDeleteTask}
            handleChooseType={this.props.handleChooseType}
            tabs_group_focus={this.state.tabs_group_focus}
            changeTabsGroupFocus={this.changeTabsGroupFocus.bind(this)} />
          <TabsMember
            course_subject_teams={this.state.course_subject_teams}
            course={this.props.course}
            subject={this.props.subject}
            subject_detail={this.state.subject_detail}
            training_standard={this.props.training_standard}
            evaluation_template={this.props.evaluation_template}
            evaluation_standards={this.props.evaluation_standards}
            member_evaluations={this.state.member_evaluations}
            handleAfterCreatedTeam={this.props.handleAfterCreatedTeam}
            afterAddTaskForUser={this.props.afterAddTaskForUser}
            tabs_group_focus={this.state.tabs_group_focus}
            changeTabsGroupFocus={this.changeTabsGroupFocus.bind(this)} />
          {this.renderUserTaskModal()}
          {this.renderTaskModal()}
        </div>
      )
    } else {
      return (
        <div>
          <TabsTask
            subject_detail={this.state.subject_detail}
            handleAfterDeleteTask={this.props.handleAfterDeleteTask}
            tabs_group_focus={this.state.tabs_group_focus}
            changeTabsGroupFocus={this.changeTabsGroupFocus.bind(this)}
            handleChooseType={this.props.handleChooseType}
          />
          {this.renderTaskModal()}
        </div>
      )
    }
  }

  changeTabsGroupFocus(new_index_focus) {
    this.setState({
      tabs_group_focus: new_index_focus
    })
  }

  renderUserTaskModal() {
    let modalUserTask = null;

    if (this.props.course) {
      let panelUserTask = null;
      if(this.state.subject_detail.user_subjects &&
        this.state.subject_detail.user_subjects[this.state.user_index]) {
        panelUserTask = (
          <ModalTask
            task={this.state.subject_detail.course_subject_task}
            user_tasks={this.state.subject_detail
              .user_subjects[this.state.user_index].user_course_task}
            user_index={this.state.user_index}
            ownerable_id={this.state.subject_detail.course_subject.id}
            ownerable_type='CourseSubject'
            subject_detail={this.state.subject_detail}
            handleAfterAddTask={this.props.handleAfterAddTask}
            afterCreateTask={this.props.afterCreateTask}
            user={this.state.user}
            handleAfterDeleteTask={this.props.handleAfterDeleteTask}
          />
        )
      }

      modalUserTask = (
        <div className='modalUserTask modal fade in' role='dialog'>
          <div className='modal-dialog modal-lg'>
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
      )
    }

    return(
      <div className='modalUser'>
        {modalUserTask}
      </div>
    )
  }

  renderTaskModal() {
    let tasks = null;
    let ownerable_id = null;
    let ownerable_type = '';

    if (this.props.course) {
      ownerable_id = this.state.subject_detail.course_subject.id;
      ownerable_type = 'CourseSubject';
    } else {
      ownerable_id = this.state.subject_detail.id;
      ownerable_type = 'Subject';
    }

    tasks = this.state.subject_detail.tasks;

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
              <ModalBody
                task={tasks}
                type={this.state.type}
                ownerable_id={ownerable_id}
                ownerable_type={ownerable_type}
                course={this.props.course}
                handleChooseType={this.props.handleChooseType}
                subject_detail={this.state.subject_detail}
                handleAfterAddTask={this.props.handleAfterAddTask}
                afterCreateTask={this.props.afterCreateTask}
                course_subject_task={this.state.subject_detail.course_subject_task}
                meta_types={this.state.meta_types}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
