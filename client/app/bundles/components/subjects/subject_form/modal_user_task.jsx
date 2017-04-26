import BlockTasks from '../block_tasks'
import ListTasks from './list_tasks';
import React from 'react';
import UserTasks from './user_tasks'

export default class ModalUserTask extends React.Component{
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
    let button_name = I18n.t('buttons.add_task')
    let user_task = (
      <UserTasks user_tasks={this.state.user_tasks} type={this.state.type}
        handleAfterDeleteTask={this.props.handleAfterDeleteTask}
        user_index={this.props.user_index} user={this.props.user} />
    )

    return(
      <div className='modal-task'>
        <div className='modal-body'>
          <div className='select-task'>
            <div className='form-group choose-task'>
              <label htmlFor='sel1'>{I18n.t('subjects.select_task')}</label>
              <select className='form-control' id='sel1'
                onChange={this.afterSelectTask.bind(this)} >
                <option value=''>{I18n.t('subjects.choose_task')}</option>
                <option value='assignment'>{I18n.t('subjects.assignment')}</option>
                <option value='survey'>{I18n.t('subjects.survey')}</option>
                <option value='test_rule'>{I18n.t('subjects.test_rule')}</option>
              </select>
            </div>
          </div>
          <div className='list-task clearfix'>
            {user_task}
          </div>
        </div>
        <div className='modal-footer'>
          <button type='button' className='btn btn-default'
            onClick={this.afterClickCloseModal.bind(this)}>
            {I18n.t('subjects.buttons.close')}</button>
        </div>
      </div>
    )
  }
  afterClickCloseModal() {
    $('.modal-list-task').modal('hide');
    $('.modal-assign').modal();
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
