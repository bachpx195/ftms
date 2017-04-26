import React from 'react';
import Time from 'react-time-format';

import * as routes from 'config/routes';

export default class TrainingStandards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.subject.tasks,
    };
  }

  renderTask(task) {
    if (task.status == 'init') {
      return (
        <span className="td-task-status td-init">
          {task.status}
        </span>
      );
    }
    else if (task.status == 'in_progress') {
      return (
        <span className="td-task-status td-in-progress">
          {task.status}
        </span>
      );
    }
    else if (task.status == 'finish') {
      return (
        <span className="td-task-status td-finish">
          {task.status}
        </span>
      );
    }
    else if (task.status == 'reject') {
      return (
        <span className="td-task-status td-reject">
          {task.status}
        </span>
      );
    }
  }

  renderListTasks(tasks) {
    return _.map(tasks, task => {
      return (
        <div key={task.id} className='td-task'>
          <h5 className='td-task-name'>
            {task.targetable.name}
          </h5>
          {this.renderTask(task)}
          <i className="pull-right td-task-time">
          <Time value={task.targetable.created_at} format="DD-MM-YYYY" />
          </i>
        </div>
      );
    });
  }

  render() {
    return (
      <div className={`clearfix td-list-tasks-${this.props.subject.id} col-sm-12
        collapse in`}>
        {this.renderListTasks(this.state.tasks)}
      </div>
    );
  }
}
