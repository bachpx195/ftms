import axios from 'axios';
import React from 'react';

import * as app_constants from 'constants/app_constants';
import * as training_standard_constants from '../constants/training_standard_constants';

export default class Reject extends React.Component {
  render() {
    return (
      <button className='btn btn-danger'
        onClick={this.onRejectSubject.bind(this)}
        title={I18n.t('training_standards.reject')}
        data-index={this.props.index} >
        <i className='fa fa-times' aria-hidden='true' data-index={this.props.index}></i>
      </button>
    )
  }

  onRejectSubject(event) {// Delete standard_subject
    let $target = $(event.target);
    $target.blur();
    let subject = this.props.selected_subjects[$target.data('index')];
    if (confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(this.props.standard_subject_url + '/' + subject.id +
        '?training_standard_id=' + this.props.training_standard.id, {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        }, headers: {'Accept': 'application/json'}
      })
      .then(response => this.props.afterRejectSubject(subject))
      .catch(error => console.log(error));
    }
  }
}
