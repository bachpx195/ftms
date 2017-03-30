import React from 'react';
import Form from './form';

import * as app_constants from 'constants/app_constants';
import * as subject_constants from '../subject_constants';
const SUBJECT_URL = app_constants.APP_NAME + subject_constants.SUBJECT_PATH;

export default class ModalCreatSubject extends React.Component {

  render() {
    return (
      <div id='modalCreatSubject' className='modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{I18n.t('subjects.modals.header_create')}</h4>
            </div>
            <div className='modal-body'>
              <Form subject={this.props.subject} url={SUBJECT_URL}
                handleAfterSaved={this.handleAfterCreated.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterCreated(subject) {
    this.props.handleAfterCreated(subject);
    $('#modalCreatSubject').modal('hide');
  }
}
