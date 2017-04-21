import axios from 'axios';
import BlockTasks from '../block_tasks'
import ListTasks from './list_tasks';
import React from 'react';
import UserTasks from './user_tasks'

export default class ModalTask extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      task: props.task,
      type: '',
      survey_id: '',
      list_user: true,
      user_tasks: props.user_tasks
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      task: nextProps.task,
      user_tasks: nextProps.user_tasks
    })
  }

  render() {
    let user_task;
    let button_name ;
    let available_tasks = [];
    if (this.state.type != '') {
      available_tasks = this.state.task[this.state.type].filter(task => {
        return this.state.user_tasks[this.state.type]
          .findIndex(_user_task => _user_task.id == task.id) < 0;
      });
    }
    let list_available_tasks = Object.assign({}, this.state.task,
      {[this.state.type]: available_tasks});
    if(this.state.list_user) {
      button_name = I18n.t('buttons.add_task')
      user_task = (
        <UserTasks user_tasks={this.state.user_tasks} type={this.state.type}
          handleAfterDeleteTask={this.props.handleAfterDeleteTask}
          user_index={this.props.user_index} user={this.props.user} />
      )
    } else {
      button_name = I18n.t('buttons.list_task')
      user_task = (
        <div className='panel-project panel-body'>
          <ListTasks task={list_available_tasks} type={this.state.type}
            afterChoose={this.afterChoose.bind(this)}
            ownerable_id={this.props.ownerable_id}
            ownerable_type={this.props.ownerable_type}
            subject_detail={this.props.subject_detail}
            handleAfterAddTask={this.props.handleAfterAddTask}
            afterCreateTask={this.props.afterCreateTask}
            user={this.props.user} targetable_type="StaticTask"
            user_index={this.props.user_index}
            changePanel={this.changePanel.bind(this)}/>
        </div>
      )
    }

    return(
      <div className='modal-task'>
        <div className='modal-body'>
          <div className='button-show'>
            <button className='change-panel btn btn-primary'
              onClick={this.changePanel.bind(this)}>
              {button_name}
            </button>
          </div>
          <div className='select-task'>
            <div className="form-group choose-task">
              <label htmlFor="sel1">{I18n.t("subjects.select_task")}</label>
              <select className="form-control" id="sel1"
                onChange={this.afterSelectTask.bind(this)} >
                <option value=''>{I18n.t("subjects.choose_task")}</option>
                <option value='assignment'>{I18n.t("subjects.assignment")}</option>
                <option value='survey'>{I18n.t("subjects.survey")}</option>
                <option value='test_rule'>{I18n.t("subjects.test_rule")}</option>
              </select>
            </div>
          </div>
          <div className='list-task clearfix'>
            {user_task}
          </div>
        </div>
      </div>
    )
  }
  changePanel() {
    this.setState({
      list_user: !this.state.list_user
    })
  }

  afterSelectTask(event) {
    let target = event.target;
    $(target).blur();
    let type = '';
    if($(target).val() != '') {
      type = $(target).val() + 's';
    }
    this.setState({
      type: type,
    })
  }

  afterChoose(id) {
    this.setState({
      id: id
    });
  }
}
