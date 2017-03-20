import React from 'react';
import axios from 'axios';

import ListTasks from './list_tasks';
export default class ModalBody extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      type: '',
      task: props.task,
      survey_id: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      task: nextProps.task
    });
  }

  render(){
    let task = (
      <div className='panel-project panel-body'>
        <ListTasks task={this.state.task} type={this.state.type}
          afterChoose={this.afterChoose.bind(this)}
          subject_id={this.props.subject_id}
          subject_detail={this.props.subject_detail}
          handleAfterAddTask={this.handleAfterAddTask.bind(this)}
          afterCreateTask={this.afterCreateTask.bind(this)} />
      </div>
    );
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

  afterSelectTask(event){
    let target = event.target;
    $(target).blur();
    let type = $(target).val() + 's';
    this.setState({
      type: type,
    })
  }

  afterChoose(id){
    this.setState({
      id: id
    });
  }

  handleAfterAddTask(type, ids, targets, subject_detail) {
    this.props.handleAfterAddTask(type, ids, targets, subject_detail);
  }
  afterCreateTask(target, type){
    this.props.afterCreateTask(target, type)
  }
}
