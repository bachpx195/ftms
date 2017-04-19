import React from 'react';

export default class EvaluationStandards extends React.Component {
  render() {
    return (
      <div className='ts-evaluation-standard-list col-md-6'>
        <h3>{I18n.t('courses.evaluation_standards_list')}</h3>
          {this.renderEvaluationStandards()}
      </div>
    );
  }

  renderEvaluationStandards() {
    return this.props.evaluation_standards.map(evaluation_standard => {
      return(
        <p key={evaluation_standard.id} className='list-group-item'>
          <i>{evaluation_standard.id + '. '}</i> {evaluation_standard.name}
        </p>
      )
    })
  }
}
