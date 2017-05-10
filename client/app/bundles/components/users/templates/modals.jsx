import React from 'react';
import ModalUniversity from '../../universities/templates/modal';
import ModalTrainee from '../..//trainee_types/templates/modal';
import ModalLanguage from '../../languages/templates/modal';
import ModalStage from '../../stages/templates/modal_edit';

export default class Modals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      university: {},
      language: {},
      trainee_type: {},
      stage: {}
    }
  }

  render() {
    return (
      <div>
        <ModalUniversity
          university={this.state.university}
          handleAfterCreated={this.props.handleAfterCreated} />
        <ModalLanguage
          language={this.state.language}
          handleAfterCreated={this.props.handleAfterCreated} />
        <ModalTrainee
          trainee={this.state.trainee}
          handleAfterCreated={this.props.handleAfterCreated} />
        <ModalStage
          stage={this.state.stage}
          handleAfterCreated={this.props.handleAfterCreated} />
      </div>
    );
  }
}

