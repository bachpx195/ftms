import React from 'react';

export default class TrainingStandardSubjects extends React.Component {
  render() {
    return (
      <div className='ts-subjects-list col-md-6'>
        <h3>{I18n.t('courses.subjects-list')}</h3>
          {this.renderSubject()}
      </div>
    );
  }

  renderSubject() {
    return this.props.course.training_standard.subjects.map((subject, index) =>{
      return(
        <p key={index} className='list-group-item'>
          <i>{index+1 + '. '}</i>
          {subject.name}
        </p>
      )
    })
  }
}
