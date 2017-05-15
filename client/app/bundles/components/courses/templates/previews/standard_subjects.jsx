import React from 'react';
import SubjectItem from './subject_item';

export default class StandardSubjects extends React.Component {
  render() {
    return (
      <div className='ts-subjects-list col-md-6'>
        <h3>{I18n.t('courses.subjects-list')}</h3>
          {this.renderStandardSubjects()}
      </div>
    );
  }

  renderStandardSubjects() {
    return this.props.subjects.map((subject, index) => {
      return <SubjectItem
        handleSubjectDetails={this.props.handleSubjectDetails}
        handleTaskDetails={this.props.handleTaskDetails}
        key={subject.id} index={index} subject={subject} />;
    })
  }
}
