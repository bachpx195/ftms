import axios from 'axios';
import React from 'react';

import ListTasks from './list_tasks';

import * as routes from 'config/routes';

require('../../../assets/sass/modal_assign_member.scss');

export default class ModalDynamicTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      static_assignments: props.static_assignments,
      static_surveys: props.static_surveys,
      static_test_rules: props.static_test_rules,
      checked_assignments: [],
      checked_surveys: [],
      checked_test_rules: [],
      selected_dynamic_tasks: [],
      checked_dynamic_tasks: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      checked_assignments: [],
      checked_surveys: [],
      checked_test_rules: [],
      checked_dynamic_tasks: [],
    });
  }

  renderTasks(type) {
    if (type == '') {
      return (
        <h4></h4>
      )
    }

    if (type == 'assignments') {
      return (
        <div className='list-assignments'>
          <ListTasks static_tasks={this.state.static_assignments}
            checkedTasks={this.state.checked_assignments}
            handleClickTask={this.handleClickAssignment.bind(this)}
            className='list-assignments'
            title={I18n.t('teams.titles.assignments')}
          />
        </div>
      )
    }

    if (type == 'surveys') {
      return (
        <div className='list-surveys'>
          <ListTasks static_tasks={this.state.static_surveys}
            checkedTasks={this.state.checked_surveys}
            handleClickTask={this.handleClickSurvey.bind(this)}
            className='list-surveys'
            title={I18n.t('teams.titles.surveys')}
          />
        </div>
      )
    }
  }

  render() {
    return (
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
        <div className='clearfix'>
          <div className='col-md-5'>
            {this.renderTasks(this.state.type)}
          </div>

          <div className='col-md-2 action-assign'>
            <button className="btn btn-success center-block assign-members"
              onClick={this.assignTasks.bind(this)}>
              <i className="fa fa-angle-double-right" aria-hidden="true"></i>
            </button>
            <button className="btn btn-danger center-block reject-users"
              onClick={this.rejectTasks.bind(this)}>
              <i className="fa fa-angle-double-left" aria-hidden="true"></i>
            </button>
          </div>

          <div className='col-md-5'>
            <ListTasks static_tasks={this.state.selected_dynamic_tasks}
              checkedTasks={this.state.checked_dynamic_tasks}
              handleClickTask={this.handleClickTask.bind(this)}
              className='list-dynamic-tasks'
              title={I18n.t('teams.titles.create_dynamic_tasks')}
            />
          </div>
        </div>
        <button type='button' className='btn btn-secondary' data-dismiss='modal'>
          {I18n.t('buttons.cancel')}
        </button>
        <button type='button' className='btn btn-primary' >
          {I18n.t('buttons.save')}
        </button>
      </div>
    );
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

  handleClickAssignment(task, checked) {
    if (checked) {
      _.remove(this.state.checked_assignments, checked_task => {
        return checked_task.id == task.id;
      });
    } else {
      this.state.checked_assignments.push(task);
    }
    this.setState({checked_assignments: this.state.checked_assignments});
  }

  handleClickTask(task, checked) {
    if (checked) {
      _.remove(this.state.checked_dynamic_tasks, checked_task => {
        return checked_task == task;
      });
    } else {
      this.state.checked_dynamic_tasks.push(task);
    }
    this.setState({checked_dynamic_tasks: this.state.checked_dynamic_tasks});
  }

  handleClickSurvey(task, checked) {
    if (checked) {
      _.remove(this.state.checked_assignments, checked_task => {
        return checked_task.id == task.id;
      });
    } else {
      this.state.checked_users.push(task);
    }
    this.setState({checked_assignments: this.state.checked_assignments});
  }

  rejectTasks() {
    let not_checked_dynamic_tasks = this.state.selected_dynamic_tasks
      .filter(task => this.state.checked_dynamic_tasks.indexOf(task) < 0);
    for(let type_static of ['assignments', 'surveys', 'test_rules']) {
      this.state['static_' + type_static] = this.props['static_' + type_static]
        .filter(_user => not_checked_dynamic_tasks.indexOf(_user) < 0);
    }
    _.remove(this.state.selected_dynamic_tasks, selected_dynamic_task => {
      return this.state.checked_dynamic_tasks
        .indexOf(selected_dynamic_task) >= 0;
    });
    this.state.checked_dynamic_tasks = [];
    this.setState({state: this.state});
  }

  assignTasks() {
    let tasks = this.state.selected_dynamic_tasks
      .concat(this.state['checked_' + this.state.type]);
    let static_tasks = this.state['static_' + this.state.type]
      .filter(_user => {
        return this.state['checked_' + this.state.type].indexOf(_user) < 0;
    });
    this.setState({
      ['checked_' + this.state.type]: [],
      selected_dynamic_tasks: tasks,
      ['static_' + this.state.type]: static_tasks
    });
  }

}
