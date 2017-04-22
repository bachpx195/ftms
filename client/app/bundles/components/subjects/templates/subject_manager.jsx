import axios from 'axios';
import Create from '../../projects/actions/create';
import ListTabs from '../supervisor/list_tabs';
import Modal from '../../projects/templates/modal';
import React from 'react';
import SubjectPolicy from 'policy/subject_policy';

import * as app_constants from 'constants/app_constants';

const SUBJECTS_URL = app_constants.APP_NAME + app_constants.SUBJECTS_PATH;

export default class SubjectManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course_subject_teams: props.course_subject_teams,
      subject_detail: props.subject_detail,
      member_evaluations: props.member_evaluations,
      member_ids: props.member_ids,
      user_index: 0
    }
  }

  render() {
    let projects_url = SUBJECTS_URL + '/' + this.state.subject_detail.id + '/' +
      'projects';
    let add_task_button = null;
    if (this.props.course) {
      add_task_button = (
        <SubjectPolicy
          permit={
            [{action: ['owner'], target: 'children',
                data: {owner_id: this.props.course.owner_id}},
              {action: ['course_manager'], target: 'children',
                data: {members_ids: this.state.member_ids}}]}
        >
          <button type='button' className='btn btn-primary'
            onClick={this.afterClickAddTask.bind(this)}>
            {I18n.t('subjects.add_task')}
          </button>
        </SubjectPolicy>
      );
    } else {
      add_task_button = (
        <button type='button' className='btn btn-primary'
          onClick={this.afterClickAddTask.bind(this)}>
          {I18n.t('subjects.add_task')}
        </button>
      );
    }

    let user = null;
    if (this.props.course) {
      user = this.state.subject_detail.user_subjects[this.state.user_index];
    }

    return (
      <div className='admin-subject-show clearfix'>
        <div className='row'>
          <div className='col-md-2'>
            <img src={this.state.subject_detail.image.url}
              alt={I18n.t('subjects.alt_image')} className='image-subject' />
          </div>
          <div className='col-md-10'>
            <div className='subject-info col-md-9'>
              <h2 className='subject-name'>
                {this.state.subject_detail.name}
              </h2>
              <div className='description'>
                {this.state.subject_detail.description}
              </div>
              <div className='workings-day'>
                {I18n.t('subjects.headers.workings_day')}
                {this.state.subject_detail.during_time}
                {I18n.t('subjects.headers.days')}
              </div>
              <div className='organization'>
                {I18n.t('subjects.headers.training_standard')}
                {this.state.subject_detail.training_standard.name}
              </div>
            </div>
            <div className='col-md-3 text-right'>
              {add_task_button}
            </div>
            <div className='col-md-3 text-right'>
              <Create />
              <Modal organizations={this.props.organizations}
                subject_detail={this.state.subject_detail} />
            </div>
            <div className='col-md-3 text-right'>
              <a className='btn btn-primary' href={projects_url}>
                {I18n.t('buttons.list_projects')}</a>
            </div>
          </div>
        </div>
        <ListTabs subject_detail={this.state.subject_detail}
          course={this.props.course} user={user}
          user_index={this.state.user_index}
          course_subject_teams={this.state.course_subject_teams}
          afterAddTaskForUser={this.afterAddTaskForUser.bind(this)}
          handleAfterDeleteTask={this.handleAfterDeleteTask.bind(this)}
          handleAfterAddTask={this.handleAfterAddTask.bind(this)}
          afterCreateTask={this.afterCreateTask.bind(this)}
          handleAfterCreatedTeam={this.handleAfterCreatedTeam.bind(this)}
          subject={this.props.subject}
          training_standard={this.props.training_standard}
          evaluation_template={this.props.evaluation_template}
          evaluation_standards={this.props.evaluation_standards}
          member_evaluations={this.state.member_evaluations} />
        <div className='clearfix'></div>
      </div>
    );
  }

  handleAfterCreatedTeam(course_subject_teams, subject_detail) {
    this.setState({
      course_subject_teams: course_subject_teams,
      subject_detail: subject_detail
    });
  }

  afterClickAddTask() {
    this.setState({
      user: {}
    })
    $('#modalAddTask').modal();
  }

  afterAddTaskForUser(user, user_index) {
    this.setState({
      user: user,
      user_index: user_index
    })
    $('#modalUserTask').modal()
  }

  handleAfterDeleteTask(index, task, type, user_index, user) {
    if (user) {
      _.remove(this.state.subject_detail.user_subjects[user_index]
        .user_course_task[type], ({task_id}) => task_id == index);
    } else if (this.props.course) {
      _.remove(this.state.subject_detail.course_subject_task[type],
        ({task_id}) => task_id == index);
    } else {
      _.remove(this.state.subject_detail.subject_task[type], ({task_id}) => {
        return task_id == index
      });
    }
    this.setState({
      subject_detail: this.state.subject_detail
    });
  }

  handleAfterAddTask(type, targetable_ids, targets, subject_detail, user_id, user_index) {
    if (this.props.course) {
      if (user_id) {
        _.mapValues(targets, function(target) {
          subject_detail.user_subjects[user_index].user_course_task[type].push(target)
        })
      } else {
        _.mapValues(targets, function(target){
          subject_detail.course_subject_task[type].push(target)
        })
      }
    } else {
      _.mapValues(targets, function(target) {
        subject_detail.subject_task[type].push(target)
      })
    }
    this.setState({
      subject_detail: subject_detail
    })
  }

  afterCreateTask(target, type, owner) {
    if (owner == 'CourseSubject') {
      this.state.subject_detail.course_subject_task[type].push(target);
    } else {
      this.state.subject_detail.subject_task[type].push(target);
    }
    this.setState({
      subject_detail: this.state.subject_detail
    });
  }

}
