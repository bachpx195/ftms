import React from 'react';
import Form from './form';

export default class ModalEdit extends React.Component {
  render() {
    return (
      <div className='modal-edit modal modal-stages fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{I18n.t('stages.modals.header_edit')}</h4>
            </div>
            <div className='modal-body'>
              <Form
                stage={this.props.stage}
                handleAfterUpdated={this.props.handleAfterUpdated}
                handleAfterCreated={this.props.handleAfterCreated}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
