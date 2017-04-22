import axios from 'axios';
import LanguagePolicy from 'policy/language_policy';
import Modal from '../templates/modal';
import React from 'react';

import * as app_constants from 'constants/app_constants';

export default class Update extends React.Component {
  render() {
    return (
      <button className='btn btn-info' onClick={this.updateLanguage.bind(this)}>
        <i className="fa fa-pencil-square-o"></i>
        &nbsp;{I18n.t('buttons.edit')}
      </button>
    );
  }

  updateLanguage(event) {
    event.preventDefault();
    let formData = new FormData();
    let language = _.omit(this.props.state, 'errors');
    if(!this.props.state.changeImage) {
      language = _.omit(language, 'image');
    }

    for(let key of Object.keys(language)) {
      formData.append('language[' + key + ']', language[key]);
    }
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    axios({
      url: this.props.url,
      method: 'PUT',
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      $('.modal-edit').modal('hide');
      this.props.handleAfterUpdated(response.data.language);
    })
    .catch(error => {
      console.log(error);
    });
  }
}
