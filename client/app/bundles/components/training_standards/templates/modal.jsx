import React from 'react';
import Form from './form';

export default class ModalEdit extends React.Component {

  render() {
    return (
      <div className='modal modal-edit fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{I18n.t('training_standards.modals.header_edit')}</h4>
            </div>
            <div className='modal-body'>
              <Form
                training_standard={this.props.training_standard}
                organization={this.props.organization}
                handleAfterUpdate={this.props.handleAfterUpdate} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
