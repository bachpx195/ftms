import React from 'react';
import Form from './form';

import * as app_constants from 'constants/app_constants';
import * as training_standard_constants from '../training_standard_constants';
const TRAINING_STANDARD_URL = app_constants.APP_NAME +
  training_standard_constants.TRAINING_STANDARD_PATH;

export default class ModalCreateTrainingStandard extends React.Component {

  render() {
    return (
      <div className='modalCreateTrainingStandard modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{I18n.t('training_standards.modals.create')}</h4>
            </div>
            <div className='modal-body'>
              <Form
                url={TRAINING_STANDARD_URL}
                training_standard={this.props.training_standard}
                handleAfterSaved={this.handleAfterCreated.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterCreated(training_standards) {
    this.props.handleAfterCreated(training_standards);
    $('.modalCreateTrainingStandard').modal('hide');
  }
}
