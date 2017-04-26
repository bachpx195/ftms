import React from 'react';

require('../../assets/sass/modal_confirm.scss');

export default class ModalConfirm extends React.Component {
  render() {
    return (
      <div className='modal modal-confirm fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content size-modal'>
            <div className='modal-header'>
              <button className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{this.props.title}</h4>
            </div>
            <div className='modal-body text-center'>
              {this.props.body}
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-default'
                data-dismiss='modal'>{I18n.t('data.confirm_no')}</button>
              <button type='button' onClick={this.onConfirm.bind(this)}
                className={this.props.btnClass}>{this.props.button}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onConfirm(event) {
    event.preventDefault();
    this.props.onConfirmed();
    $('.modal-confirm').modal('hide');
  }
}
