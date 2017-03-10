import React from 'react';
import Form from './evaluation_standard_form';

export default class Modal extends React.Component {
  render() {
    let title = null;
    if(this.props.evaluation_standard.id){
      title = I18n.t('evaluation_templates.modals.edit_evaluation_standard');
    } else {
      title = I18n.t('evaluation_templates.modals.new_evaluation_standard');
    }
    return (
      <div id='modal' className='modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{title}</h4>
            </div>
            <div className='modal-body'>
              <Form evaluation_standard={this.props.evaluation_standard} url={this.props.url}
                handleAfterSaved={this.handleAfterSaved.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterSaved(evaluation_standard) {
    this.props.handleAfterSaved(evaluation_standard);
  }
}
