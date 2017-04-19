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
    return this.props.subjects.map((subject) => {
      return(
        <p key={subject.id} className='list-group-item'>
          <i>{subject.id + '. '}</i> {subject.name}
        </p>
      )
    })
  }
}
