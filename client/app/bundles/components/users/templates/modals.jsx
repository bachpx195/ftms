import React from 'react';
import ModalUniversity from '../../universities/templates/modal';
import ModalTrainee from '../..//trainee_types/templates/modal';
import ModalLanguage from '../../languages/templates/modal';
import ModalStage from '../../stages/templates/modal_edit';
import ModalProgram from '../../organizations/templates/creating_program_modal';
import ModalUserStatus from 'components/user_statuses/templates/modal';

export default class Modals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      university: {},
      language: {},
      trainee_type: {},
      stage: {},
      user_status: {},
      program: {}
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
        <ModalProgram
          organization={this.props.organization}
          program={this.state.program}
          handleAfterCreated={this.props.handleAfterCreated} />
        <ModalUserStatus
          user_status={this.state.user_status}
          handleAfterCreated={this.props.handleAfterCreated} />
      </div>
    );
  }
}

