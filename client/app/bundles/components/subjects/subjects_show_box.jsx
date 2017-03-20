import React from 'react';
import axios from 'axios';
import UserSubjectList from './user_subject_list';

import * as app_constants from 'constants/app_constants';
import * as subject_constants from './subject_constants';
import ModalBody from './subject_form/modalBody';
import BlockTasks from './block_tasks';

const COURSE_URL = app_constants.APP_NAME + subject_constants.COURSE_PATH;
const SUBJECT_URL = app_constants.APP_NAME + subject_constants.SUBJECT_PATH;
require('../subjects/subject.scss');

export default class SubjectsShowBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subject_detail: {
        training_standard: {},
        user_subjects: {},
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
        }
      },
    }
  }

  componentDidMount() {
    this.fetchSubject();
  }

  fetchSubject() {
    let url;
    if(this.props.course){
      url = COURSE_URL + '/' + this.props.course.id + '/' +subject_constants.SUBJECT_PATH + this.props.subject.id;
    }else{
      url = SUBJECT_URL + '/' + this.props.subject.id;
    }
    axios.get(url + '.json')
    .then(response => {
      this.setState({
        subject_detail: response.data.subject_detail,
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
        <div className='block-list-task'>
          <div id='user-subject' className='clearfix'>
            <UserSubjectList
              user_subjects={this.state.subject_detail.user_subjects}
              statuses={this.state.subject_detail.statuses} />
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
                <i className="fa fa-check-square-o"></i>{I18n.t('subjects.titles.tests')}
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

    return (
      <div>
        <div id='admin-subject-show'>
          <div className='row'>
            <div className='col-md-2'>
              <img src={this.state.subject_detail.image}
                alt='Subject Image' className='image-subject' />
            </div>
            <div className='col-md-8'>
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
              <div className='add-task col-md-3'>
                <button type='button' className='btn btn-primary'
                  onClick={this.afterClickAddTask.bind(this)}>
                  {I18n.t('buttons.add_task')}
                </button>
                {this.renderModal()}
              </div>
            </div>
          </div>
        </div>
        {list_blocks}
      </div>
    );
  }

  renderModal(){
    return(
      <div id='modalAddTask' className='modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{I18n.t('buttons.add_task')}</h4>
            </div>
            <ModalBody task={this.state.subject_detail.task}
              subject_id={this.state.subject_detail.id}
              subject_detail={this.state.subject_detail}
              handleAfterAddTask={this.handleAfterAddTask.bind(this)}
              afterCreateTask={this.afterCreateTask.bind(this)} />
          </div>
        </div>
      </div>
    )
  }

  afterClickAddTask(){
    $('#modalAddTask').modal();
  }

  handleAfterAddTask(type, targetable_ids,targets, subject_detail) {
    _.remove(this.state.subject_detail.task[type], targetable => {
      return targetable_ids.indexOf(targetable.id) >= 0;
    });
    _.mapValues(targets, function(target){
      subject_detail.subject_task[type].push(target)
    })
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
    _.remove(this.state.subject_detail.subject_task[type], ({task_id}) => {
      return task_id == index
    });
    this.state.subject_detail.task[type].push(task)
    this.state.subject_detail.task[type].sort(function(obj1, obj2){
      return obj1.id - obj2.id
    })
    this.setState({
      subject_detail: this.state.subject_detail
    })
  }
}
