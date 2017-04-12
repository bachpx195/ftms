import axios from 'axios';
import FormQuestion from './form_question'
import React from 'react';

export default class ModalQuestion extends React.Component {
  render() {
    return (
      <div className='modal fade in modal-edit' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{I18n.t('subjects.modals.header_edit')}</h4>
            </div>
            <div className='modal-body'>
              <FormQuestion question={this.props.question}
                url={this.props.url}
                afterUpdateQuestion={this.props.afterUpdateQuestion}
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
