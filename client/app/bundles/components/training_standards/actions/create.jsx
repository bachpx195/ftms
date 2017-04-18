import axios from 'axios';
import React from 'react';

import * as app_constants from 'constants/app_constants';
import * as training_standard_constants from '../constants/training_standard_constants';
import Form from '../templates/form';

export default class Create extends React.Component {

  renderModalCreate() {
    const TRAINING_STANDARD_URL = app_constants.APP_NAME +
      training_standard_constants.ORGANIZATION_PATH
      + '/' + this.props.organization.id + '/' +
      training_standard_constants.TRAINING_STANDARD_PATH;

    return (
      <div className='modalCreateTrainingStandard modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>
                &times;
              </button>
              <h4 className='modal-title'>
                {I18n.t('training_standards.modals.create')}
              </h4>
            </div>
            <div className='modal-body'>
              <Form
                url={TRAINING_STANDARD_URL}
                training_standard={this.props.training_standard}
                organization={this.props.organization}
                handleAfterSaved={this.handleAfterCreated.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className='row'>
        <button type='button' className='btn btn-info create-subject'
          onClick={this.handleCreateTrainingStandard.bind(this)}>
          <i className='fa fa-plus'></i> {I18n.t('training_standards.create')}
        </button>
        {this.renderModalCreate()}
      </div>
    );
  }

  handleCreateTrainingStandard() {
    $('.modalCreateTrainingStandard').modal();
  }

  handleAfterCreated(training_standard) {
    $('.modalCreateTrainingStandard').modal('hide');
    this.props.handleAfterCreated(training_standard);
  }
}
