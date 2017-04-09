import React from 'react';
import Form from './form';

export default class Modal extends React.Component {
  render() {
    return (
      <div className='modal fade in modalEdit' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{I18n.t('subjects.modals.header_edit')}</h4>
            </div>
            <div className='modal-body'>
              <Form
                category={this.props.category}
                url={this.props.url}
                handleAfterUpdated={this.handleAfterUpdated.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterUpdated(category) {
    this.props.handleAfterUpdated(category);
  }
}
