import React from 'react';
import axios from 'axios';

import ListTasks from './list_tasks';
import BlockTasks from '../block_tasks'
import UserTasks from './user_tasks'
export default class ModalBody extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      task: props.task,
      type: '',
      survey_id: '',
      course: props.course,
      course_subject_task: props.course_subject_task
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      task: nextProps.task,
      course: nextProps.course,
      course_subject_task: nextProps.course_subject_task
    });
  }

  render(){
    let task;
    if (this.props.course){
      let available_tasks = [];
      if(this.state.type != '') {
        available_tasks = this.state.task[this.state.type].filter(task => {
          return this.state.course_subject_task[this.state.type]
            .findIndex(_task => _task.id == task.id) < 0;
        });
      }
      this.state.task[this.state.type] = available_tasks;

      task = (
        <div className='panel-project panel-body'>
          <ListTasks task={this.state.task} type={this.state.type}
            afterChoose={this.afterChoose.bind(this)}
            ownerable_id={this.props.ownerable_id}
            ownerable_type={this.props.ownerable_type}
            subject_detail={this.props.subject_detail}
            handleAfterAddTask={this.handleAfterAddTask.bind(this)}
            afterCreateTask={this.afterCreateTask.bind(this)}
            user='' targetable_type={this.state.type} />
        </div>
      )
    } else {
      task = (
        <div className='panel-project panel-body'>
          <ListTasks task={this.state.task} type={this.state.type}
            afterChoose={this.afterChoose.bind(this)}
            ownerable_id={this.props.ownerable_id}
            ownerable_type={this.props.ownerable_type}
            subject_detail={this.props.subject_detail}
            handleAfterAddTask={this.handleAfterAddTask.bind(this)}
            afterCreateTask={this.afterCreateTask.bind(this)}
            user='' targetable_type={this.state.type} />
        </div>
      )
    }
    return(
      <div className='modal-task'>
        <div className='modal-body'>
          <div className='select-task'>
            <div className="form-group choose-task">
              <label htmlFor="sel1">{I18n.t("subjects.select_task")}</label>
              <select className="form-control" id="sel1"
                onChange={this.afterSelectTask.bind(this)} >
                <option value=''>{I18n.t("subjects.choose_task")}</option>
                <option value='assignment'>{I18n.t("subjects.assignment")}</option>
                <option value='survey'>{I18n.t("subjects.survey")}</option>
                <option value='test_rule'>{I18n.t("subjects.test_rule")}</option>
                {this.renderProject()}
            </select>
            </div>
          </div>
          <div className='list-task'>
            {task}
          </div>
        </div>
      </div>
    )
  }

  renderProject() {
    if(this.state.course){
      return(<option value='project'>{I18n.t("subjects.project")}</option>)
    }
  }

  changePanelAddTask(){
    this.setState({
      user_type: 'add task'
    })
  }

  afterSelectTask(event){
    let target = event.target;
    $(target).blur();
    let type = '';
    if($(target).val() != ''){
      type = $(target).val() + 's';
    }
    this.setState({
      type: type,
    })
  }

  afterChoose(id){
    this.setState({
      id: id
    });
  }

  handleAfterAddTask(type, ids, targets, subject_detail, user_id) {
    this.props.handleAfterAddTask(type, ids, targets, subject_detail, user_id);
  }

  afterCreateTask(target, type, owner){
    this.props.afterCreateTask(target, type, owner);
  }
}
