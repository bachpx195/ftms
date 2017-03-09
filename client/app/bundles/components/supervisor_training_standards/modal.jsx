import React from 'react';
import Form from './form';

export default class Modal extends React.Component {
  render() {
    return (
      <div id='modalEdit' className='modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{I18n.t('training_standards.modals.header_edit')}</h4>
            </div>
            <div className='modal-body'>
              <Form standard_organization={this.props.standard_organization} url={this.props.url}
                handleAfterSaved={this.handleAfterUpdated.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterUpdated(standard_organization) {
    this.props.handleAfterUpdated(standard_organization);
  }
}
