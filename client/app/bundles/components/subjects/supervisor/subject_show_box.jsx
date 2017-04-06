import React from 'react';
import axios from 'axios';
import ListTabs from './list_tabs';

import * as app_constants from 'constants/app_constants';
import * as subject_constants from '../subject_constants';

const COURSE_URL = app_constants.APP_NAME + subject_constants.COURSE_PATH;
const SUBJECT_URL = app_constants.APP_NAME + subject_constants.SUBJECT_PATH;

export default class SupervisorSubjectShowBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course_subject_teams: props.course_subject_teams,
      subject_detail: props.subject_detail,
      member_evaluations: props.member_evaluations
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      course_subject_teams: nextProps.course_subject_teams,
      subject_detail: nextProps.subject_detail,
      member_evaluations: nextProps.member_evaluations
    });
  }

  render() {
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
              <button type='button' className='btn btn-primary'
                onClick={this.afterClickAddTask.bind(this)}>
                {I18n.t('subjects.add_task')}
              </button>
            </div>
          </div>
        </div>
        <ListTabs subject_detail={this.state.subject_detail}
          course={this.props.course} user={this.state.user}
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
      this.state.subject_detail.course_subject_task[type].push(task)
      this.state.subject_detail.course_subject_task[type]
        .sort((obj1, obj2) => obj1.id - obj2.id);
    } else if (this.props.course) {
      _.remove(this.state.subject_detail.course_subject_task[type],
        ({task_id}) => task_id == index);
    } else {
      _.remove(this.state.subject_detail.subject_task[type], ({task_id}) => {
        return task_id == index
      });
      this.state.subject_detail.task[type].push(task);
      this.state.subject_detail.task[type].sort((obj1, obj2) => {
        return obj1.id - obj2.id
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
        _.remove(this.state.subject_detail.subject_task[type], targetable => {
          return targetable_ids.indexOf(targetable.id) >= 0;
        });
        _.mapValues(targets, function(target){
          subject_detail.course_subject_task[type].push(target)
        })
      }
    } else {
      _.remove(this.state.subject_detail.task[type], targetable => {
        return targetable_ids.indexOf(targetable.id) >= 0;
      });
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
