import FormEdit from './form_edit';
import React from 'react';

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
              <FormEdit
                training_standard={this.props.training_standard}
                organization={this.props.organization}
                handleAfterSaved={this.props.handleAfterUpdate} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
