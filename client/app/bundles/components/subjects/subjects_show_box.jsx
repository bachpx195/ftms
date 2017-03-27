import React from 'react';
import axios from 'axios';
import UserSubjectList from './user_subject_list';
import SubjectShowBoxTrainee from './trainee/subject_show_box';
import TeamList from './team/team_list';

import * as app_constants from 'constants/app_constants';
import * as subject_constants from './subject_constants';
import ModalBody from './subject_form/modalBody';
import ModalTask from './subject_form/modalTask';
import BlockTasks from './block_tasks';

const COURSE_URL = app_constants.APP_NAME + subject_constants.COURSE_PATH;
const SUBJECT_URL = app_constants.APP_NAME + subject_constants.SUBJECT_PATH;

require('../subjects/subject.scss');

export default class SubjectsShowBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assigments_of_user_subjects: props.assigments,
      admin: true, // Check tam admin. Sau co policy client check lai
      current_user: props.current_user,
      course_subject_teams: [],
      subject_detail: {
        training_standard: {},
        statuses:[],
        task: {
          surveys: [],
          test_rules: [],
          assignments: []
        },
        subject_task: {
          surveys: [],
          test_rules: [],
          assignments: []
        },
        course_subject: {},
        user_subjects: [],
        user_course_task: {
          surveys: [],
          test_rules: [],
          assignments: []
        }
      },
      user: {},
      user_index: 0
    }
  }

  componentDidMount() {
    if(this.state.admin) {// Check tam admin. Sau co policy client check lai
      this.fetchSubject();
    }
  }

  fetchSubject() {
    let url;
    if(this.props.course){
      url = COURSE_URL + this.props.course.id + '/' +
        subject_constants.SUBJECT_PATH + this.props.subject.id;
    }else{
      url = SUBJECT_URL + this.props.subject.id;
    }
    axios.get(url + '.json')
    .then(response => {
      this.setState({
        course_subject_teams: response.data.subject_detail.course_subject_teams,
        subject_detail: response.data.subject_detail
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    let list_blocks;
    if(this.props.course){
      list_blocks = (
        <div className='blocks'>
          <ul className='nav nav-tabs tab-bar'>
            <li className='active'>
              <a data-toggle='tab' href='#user-subject'>
                <i className='fa fa-file-text-o'></i>
                  {I18n.t('subjects.titles.unassigned_members')}
              </a>
            </li>
            <li>
              <a data-toggle='tab' href='#list_team'>
                <i className='fa fa-pencil-square-o'></i>
                  {I18n.t('subjects.titles.list_team')}
              </a>
            </li>
          </ul>
          <div className='tab-content'>
            <div id='user-subject' className='tab-pane fade in active clearfix'>
              <div className='col-md-12'>
                <div className='box box-success'>
                  <div className='box-body'>
                    <UserSubjectList
                      user_subjects={this.state.subject_detail.user_subjects}
                      statuses={this.state.subject_detail.statuses}
                      afterAddTaskForUser={this.afterAddTaskForUser.bind(this)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div id='list_team' className='tab-pane fade'>
              <div className='col-md-12'>
                <TeamList course_subject={this.state.subject_detail.course_subject}
                  course_subject_teams={this.state.course_subject_teams}
                  handleAfterCreatedTeam={this.handleAfterCreatedTeam.bind(this)}
                  unassigned_user_subjects={this.state.subject_detail.user_subjects}
                />
              </div>
            </div>
            <div className='clearfix'></div>
          </div>
        </div>
      )
    }else{
      list_blocks = (
        <div className='blocks'>
          <ul className='nav nav-tabs tab-bar'>
            <li className='active'>
              <a data-toggle='tab' href='#home'>
                <i className='fa fa-file-text-o'></i>{I18n.t('subjects.titles.surveys')}
              </a>
            </li>
            <li>
              <a data-toggle='tab' href='#menu1'>
                <i className='fa fa-pencil-square-o'></i>{I18n.t('subjects.titles.assignments')}
              </a>
            </li>
            <li>
              <a data-toggle='tab' href='#menu2'>
                <i className='fa fa-check-square-o'></i>{I18n.t('subjects.titles.tests')}
              </a>
            </li>
          </ul>
          <div className='tab-content'>
            <div id='home' className='tab-pane fade in active'>
              <div id='survey' className='clearfix'>
                <BlockTasks tasks={this.state.subject_detail.subject_task.surveys}
                  title={I18n.t('subjects.titles.surveys')}
                  handleAfterDeleteTask={this.handleAfterDeleteTask.bind(this)}
                  type='surveys'/>
              </div>
            </div>
            <div id='menu1' className='tab-pane fade'>
              <div id='assignment' className='clearfix'>
                <BlockTasks tasks={this.state.subject_detail.subject_task.assignments}
                  title={I18n.t('subjects.titles.assignments')}
                  handleAfterDeleteTask={this.handleAfterDeleteTask.bind(this)}
                  type='assignments'/>
              </div>
            </div>
            <div id='menu2' className='tab-pane fade'>
              <div id='test_rules' className='clearfix'>
                <BlockTasks tasks={this.state.subject_detail.subject_task.test_rules}
                  title={I18n.t('subjects.titles.tests')}
                  handleAfterDeleteTask={this.handleAfterDeleteTask.bind(this)}
                  type='test_rules'/>
              </div>
            </div>
          </div>
        </div>
      )
    }
    if (this.state.admin) {// Check tam admin. Sau co policy client check lai
      return (
        <div className='admin-subject-show'>
          <div className='row'>
            <div className='col-md-2'>
              <img src={this.state.subject_detail.image}
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
              <div className='add-task col-md-3 text-right'>
                <button type='button' className='btn btn-primary'
                  onClick={this.afterClickAddTask.bind(this)}>
                  {I18n.t('subjects.add_task')}
                </button>
              </div>
            </div>
          </div>
          {list_blocks}
          {this.renderModal()}
        </div>
      );
    }else {
      return(
        <div>
          <SubjectShowBoxTrainee
            current_user={this.state.current_user}
            assigments_of_user_subjects={this.state.assigments_of_user_subjects}
          />
        </div>
      );
    }
  }

  renderModal(){
    let modalBody;
    let modalUserTask;
    let panelUserTask;

    if(this.props.course){
      modalBody = (
        <ModalBody task={this.state.subject_detail.subject_task}
        ownerable_id={this.state.subject_detail.course_subject.id}
        ownerable_type='CourseSubject'
        course={this.props.course}
        subject_detail={this.state.subject_detail}
        handleAfterAddTask={this.handleAfterAddTask.bind(this)}
        afterCreateTask={this.afterCreateTask.bind(this)}
        />
      )

      if(this.state.subject_detail.user_subjects[this.state.user_index]){
        panelUserTask = (
          <ModalTask
            task={this.state.subject_detail.course_subject_task}
            user_tasks={this.state.subject_detail.user_subjects[this.state.user_index].user_course_task}
            ownerable_id={this.state.subject_detail.course_subject.id}
            ownerable_type='CourseSubject'
            subject_detail={this.state.subject_detail}
            handleAfterAddTask={this.handleAfterAddTask.bind(this)}
            afterCreateTask={this.afterCreateTask.bind(this)} user={this.state.user}
            handleAfterDeleteTask={this.handleAfterDeleteTask.bind(this)}/>
        )
      }else{
        panelUserTask = ''
      }

      modalUserTask = (
        <div id='modalUserTask' className='modal fade in' role='dialog'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close'
                  data-dismiss='modal'>&times;</button>
                <h4 className='modal-title'>{I18n.t('buttons.add_task')}</h4>
              </div>
              {panelUserTask}
            </div>
          </div>
        </div>
      )
    }else{
      modalBody = (
        <ModalBody task={this.state.subject_detail.task}
        ownerable_id={this.state.subject_detail.id}
        ownerable_type='Subject'
        subject_detail={this.state.subject_detail}
        handleAfterAddTask={this.handleAfterAddTask.bind(this)}
        afterCreateTask={this.afterCreateTask.bind(this)} />
      )
      modalUserTask = ''
    }

    let modalAddTask = (
      <div id='modalAddTask' className='modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{I18n.t('buttons.add_task')}</h4>
            </div>
            {modalBody}
          </div>
        </div>
      </div>
    )

    return(
      <div className='course-subject'>
        <div className='modalUser'>
          {modalUserTask}
        </div>
        <div className='modalTask'>
          {modalAddTask}
        </div>
      </div>
    )
  }

  afterClickAddTask(){
    this.setState({
      user: ''
    })
    $('#modalAddTask').modal();
  }

  afterAddTaskForUser(user, user_index){
    this.setState({
      user: user,
      user_index: user_index
    })
    $('#modalUserTask').modal()
  }

  handleAfterAddTask(type, targetable_ids,targets, subject_detail, user_id) {
    if(this.props.course){
      if(user_id){
        _.mapValues(targets, function(target){
          subject_detail.user_subjects[this.state.user_index].user_course_task[type].push(target)
        })
      }else{
        _.remove(this.state.subject_detail.subject_task[type], targetable => {
          return targetable_ids.indexOf(targetable.id) >= 0;
        });
        _.mapValues(targets, function(target){
          subject_detail.course_subject_task[type].push(target)
        })
      }
    }else{
      _.remove(this.state.subject_detail.task[type], targetable => {
        return targetable_ids.indexOf(targetable.id) >= 0;
      });
      _.mapValues(targets, function(target){
        subject_detail.subject_task[type].push(target)
      })
    }
    this.setState({
      subject_detail: subject_detail
    })
  }

  afterCreateTask(target, type){
    this.state.subject_detail.subject_task[type].push(target)
    this.setState({
      subject_detail: this.state.subject_detail
    })
  }

  handleAfterDeleteTask(index, task, type){
    if(this.props.course){
      _.remove(this.state.subject_detail.user_subjects[this.user_index].user_course_task[type], ({task_id}) => {
        return task_id == index
      });
    }else{
      _.remove(this.state.subject_detail.subject_task[type], ({task_id}) => {
        return task_id == index
      });
      this.state.subject_detail.task[type].push(task)
      this.state.subject_detail.task[type].sort(function(obj1, obj2){
        return obj1.id - obj2.id
      })
    }
    this.setState({
      subject_detail: this.state.subject_detail
    })
  }

  handleAfterCreatedTeam(team) {
    this.state.course_subject_teams.push(team);
    let user_subjects = this.state.subject_detail.user_subjects.filter(user_subject => {
      return team.user_subjects.findIndex(_user_subject => {
        return _user_subject.id == user_subject.id
      }) < 0;
    });
    Object.assign(this.state.subject_detail, {user_subjects});
    this.setState({
      course_subject_teams: this.state.course_subject_teams,
      subject_detail: this.state.subject_detail
    });
  }
}
