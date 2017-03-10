import React from 'react';
import AdminStandardBox from './admin/training_standards_box';
import SupervisorStandardBox from './supervisor/standard_box';

export default class TrainingStandardBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      training_standards: props.training_standards,
      subjects: props.subjects,
      admin: true
    }
  }

  render() {
    if(this.state.admin) {
      return (
        <AdminStandardBox
          subjects={this.state.subjects}
          training_standards={this.state.training_standards}
        />
      );
    }else {
       return (
          <SupervisorStandardBox
            training_standards={this.state.training_standards}
          />
        );
    }
  }
}
