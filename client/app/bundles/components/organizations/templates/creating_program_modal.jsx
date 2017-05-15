import React from 'react';
import FormCreateProgram from './program_creating_form';
import * as routes from 'config/routes';

export default class CreatingProgramModal extends React.Component {
  render() {
    return (
      <div className='modal-edit modal-programs modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>
                &times;
              </button>
              <h4 className='modal-title'>
                {I18n.t('programs.modals.header_create')}
              </h4>
            </div>
            <div className='modal-body'>
              <FormCreateProgram
                organization={this.props.organization}
                handleAfterCreated={this.props.handleAfterCreated} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
