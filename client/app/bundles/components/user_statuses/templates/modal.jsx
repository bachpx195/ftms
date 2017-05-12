import React from 'react';
import FormAddingUserStatus from './form';
import * as routes from 'config/routes';

export default class StatusAddingModal extends React.Component {
  render() {
    return (
      <div className='modal-edit modal-statuses modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>
                &times;
              </button>
              <h4 className='modal-title'>
                {I18n.t('users.modal.header_create')}
              </h4>
            </div>
            <div className='modal-body'>
              <FormAddingUserStatus
                user_status={this.props.user_status}
                handleAfterCreated={this.props.handleAfterCreated} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
