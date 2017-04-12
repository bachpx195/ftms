import React from 'react';
import Form from './form';

export default class Modal extends React.Component {
  render() {
    return (
      <div className='modal-edit modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>
                &times;
              </button>
              <h4 className='modal-title'>
                {I18n.t('universities.modals.header_edit')}
              </h4>
            </div>
            <div className='modal-body'>
              <Form university={this.props.university} url={this.props.url}
                handleAfterSaved={this.handleAfterUpdated.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterUpdated(university) {
    this.props.handleAfterUpdated(university);
  }
}
