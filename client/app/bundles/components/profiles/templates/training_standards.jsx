import React from 'react';
import Evaluation from './evaluation';
import Subjects from './list_subjects';

import * as routes from 'config/routes';

export default class TrainingStandards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      training_standards: props.training_standards,
    };
  }

  renderListTrainingStandards(training_standards) {
    return _.map(training_standards, training_standard => {
      return (
        <div key={training_standard.id}>
          <h3 className="box-title">
            {training_standard.name}
          </h3>
          <Evaluation
            evaluation={training_standard.evaluation}
          />
          <Subjects
            subjects={training_standard.subjects}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className='clearfix td-list-training-standards col-sm-12'>
        {this.renderListTrainingStandards(this.state.training_standards)}
      </div>
    );
  }
}
