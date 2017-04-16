import React from 'react';
import StandardBox from './admin/box';

export default class TrainingStandardBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      training_standards: props.training_standards,
      subjects: props.subjects,
    }
  }

  render() {
    return (
      <StandardBox
        subjects={this.state.subjects}
        training_standards={this.state.training_standards}
        organization={this.props.organization}
      />
    );

  }
}
