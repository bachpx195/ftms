import CourseSubject from './templates/course_subject';
import css from './assets/task.scss';
import MetaTasks from './meta_tasks';
import React from 'react';

export default class TaskBox extends React.Component {
  render() {
    return (
      <div className='row meta-tasks'>
        <div className='col-md-9'>
          <div className='content-box'>
            <MetaTasks meta_tasks={this.props.tasks.meta_tasks} />
          </div>
        </div>
        <div className='col-md-3'>
          <div className='box box-primary'>
            <div className='box-header with-border'>
              <CourseSubject subject={this.props.tasks.course_subject.subject}
                course={this.props.tasks.course_subject.course} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
