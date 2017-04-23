import Form from './form';
import React from 'react';
import * as routes from 'config/routes';

export default class ModalCreateSubject extends React.Component {

  render() {
    return (
      <div id='ModalCreateSubject' className='modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{I18n.t('subjects.modals.header_create')}</h4>
            </div>
            <div className='modal-body'>
              <Form subject={this.props.subject} url={routes.subjects_url()}
                handleAfterSaved={this.handleAfterCreated.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterCreated(subject) {
    this.props.handleAfterCreated(subject);
    $('#ModalCreateSubject').modal('hide');
  }
}
