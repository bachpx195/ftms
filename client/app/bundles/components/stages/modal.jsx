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
              <h4 className='modal-title'>{I18n.t('stages.modals.header_edit')}</h4>
            </div>
            <div className='modal-body'>
              <Form stage={this.props.stage} url={this.props.url}
                handleAfterSaved={this.handleAfterUpdated.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterUpdated(stage) {
    this.props.handleAfterUpdated(stage);
  }
}
