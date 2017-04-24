import React from 'react';

export default class CourseSubjects extends React.Component {
  render() {
    return (
      <div>
        <h2 className='subject-name'>
          {this.props.subject.name}
        </h2>
        <p className='description'>
          {this.props.subject.description}
        </p>
        <p>
          {I18n.t('tasks.course')}
          <span className='course-name'>{this.props.course.name}</span>
        </p>
        <p className='workings-day'>
          {I18n.t('subjects.headers.workings_day')}
          {this.props.subject.during_time}
          {I18n.t('subjects.headers.days')}
        </p>
        <p className='organization'>
          {I18n.t('subjects.headers.training_standard')}
          {this.props.course.training_standard.name}
        </p>
      </div>
    );
  }
}
