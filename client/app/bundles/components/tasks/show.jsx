import CourseSubject from './templates/course_subject';
import css from './assets/task.scss';
import DynamicTasks from './templates/dynamic_tasks';
import React from 'react';

export default class TaskBox extends React.Component {
  render() {
    return (
      <div className='row show-static-task'>
        <div className='col-md-9'>
          <div className='content-box'>
            <h1 className='static-task-name'>{this.props.task.name}</h1>
            <DynamicTasks tasks={this.props.task.dynamic_tasks}
              type={this.props.task.type} />
          </div>
        </div>
        <div className='col-md-3'>
          <div className='box box-primary'>
            <div className='box-header with-border'>
              <CourseSubject subject={this.props.task.course_subject.subject}
                course={this.props.task.course_subject.course} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
