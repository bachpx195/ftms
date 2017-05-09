import Form from './form';
import React from 'react';

export default class Modal extends React.Component {
  render() {
    return (
      <div className='modal fade in modalEdit modal-trainee_types' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{I18n.t('trainee_types.modals.header_edit')}</h4>
            </div>
            <div className='modal-body'>
              <Form
                url={this.props.url}
                trainee_type={this.props.trainee_type}
                handleAfterUpdated={this.props.handleAfterUpdated}
                handleAfterCreated={this.props.handleAfterCreated} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
