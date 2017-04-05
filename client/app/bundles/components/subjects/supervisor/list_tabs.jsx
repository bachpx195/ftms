import React from 'react';
import axios from 'axios';
import ModalTask from '../subject_form/modalTask';
import ModalBody from '../subject_form/modalBody';
import TabsHeader from './tabs_header';
import TabsContent from './tabs_content';

export default class ListTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject_detail: props.subject_detail,
      course_subject_teams: props.course_subject_teams,
      user: props.user,
      user_index: props.user_index,
      member_evaluations: props.member_evaluations
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      subject_detail: nextProps.subject_detail,
      course_subject_teams: nextProps.course_subject_teams,
      user: nextProps.user,
      user_index: nextProps.user_index,
      member_evaluations: nextProps.member_evaluations
    });
  }

  render() {
    return (
      <div className='blocks'>
        <div className='col-md-12'>
          <TabsHeader course={this.props.course} />
        </div>
        <TabsContent course_subject_teams={this.state.course_subject_teams}
          subject_detail={this.state.subject_detail} course={this.props.course}
          handleAfterDeleteTask={this.handleAfterDeleteTask.bind(this)}
          handleAfterCreatedTeam={this.handleAfterCreatedTeam.bind(this)}
          afterAddTaskForUser={this.afterAddTaskForUser.bind(this)}
          training_standard={this.props.training_standard}
          evaluation_template={this.props.evaluation_template}
          evaluation_standards={this.props.evaluation_standards}
          member_evaluations={this.state.member_evaluations}
          subject={this.props.subject} />
        {this.renderUserTaskModal()}
        {this.renderTaskModal()}
      </div>
    );
  }

  renderUserTaskModal() {
    let modalUserTask = null;

    if (this.props.course) {
      let panelUserTask = null;
      if(this.state.subject_detail.user_subjects &&
        this.state.subject_detail.user_subjects[this.state.user_index]) {
        panelUserTask = (
          <ModalTask task={this.state.subject_detail.course_subject_task}
            user_tasks={this.state.subject_detail
              .user_subjects[this.state.user_index].user_course_task}
            user_index={this.state.user_index}
            ownerable_id={this.state.subject_detail.course_subject.id}
            ownerable_type='CourseSubject'
            subject_detail={this.state.subject_detail}
            handleAfterAddTask={this.handleAfterAddTask.bind(this)}
            afterCreateTask={this.afterCreateTask.bind(this)}
            user={this.state.user}
            handleAfterDeleteTask={this.handleAfterDeleteTask.bind(this)}
          />
        )
      }

      modalUserTask = (
        <div id='modalUserTask' className='modal fade in' role='dialog'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close'
                  data-dismiss='modal'>&times;</button>
                <h4 className='modal-title'>
                  {I18n.t('subjects.headers.user_course')}
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
    let task = null;
    let ownerable_id = null;
    let ownerable_type = '';

    if (this.props.course) {
      task = this.state.subject_detail.subject_task;
      ownerable_id = this.state.subject_detail.course_subject.id;
      ownerable_type = 'CourseSubject';
    } else {
      task = this.state.subject_detail.task;
      ownerable_id = this.state.subject_detail.id;
      ownerable_type = 'Subject';
    }

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
              <ModalBody task={task} ownerable_id={ownerable_id}
                ownerable_type={ownerable_type} course={this.props.course}
                subject_detail={this.state.subject_detail}
                handleAfterAddTask={this.handleAfterAddTask.bind(this)}
                afterCreateTask={this.afterCreateTask.bind(this)}
                course_subject_task={this.state.subject_detail
                  .course_subject_task}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleAfterDeleteTask(index, task, type, user_index, user) {
    this.props.handleAfterDeleteTask(index, task, type, user_index, user);
  }

  handleAfterAddTask(type, targetable_ids,targets, subject_detail, user_id,user_index) {
    this.props.handleAfterAddTask(type, targetable_ids,targets, subject_detail,
      user_id, user_index);
  }

  afterCreateTask(target, type, owner) {
    this.props.afterCreateTask(target, type, owner);
  }

  afterAddTaskForUser(user, user_index) {
    this.props.afterAddTaskForUser(user, user_index);
  }

  handleAfterCreatedTeam(course_subject_teams, subject_detail) {
    this.props.handleAfterCreatedTeam(course_subject_teams, subject_detail);
  }
}
