import React from 'react';
import axios from 'axios';
import * as routes from 'config/routes';

export default class Create extends React.Component {
  render() {
    return (
      <button type='submit' onClick={this.createLanguage.bind(this)}
        className='btn btn-primary'>
        <i className="fa fa-floppy-o"></i>
        &nbsp;{I18n.t('buttons.save')}
      </button>
     );
   }

  createLanguage(event) {
    event.preventDefault();
    let formData = new FormData();

    let language = _.omit(this.props.state, 'errors');

    for(let key of Object.keys(language)) {
      formData.append('language[' + key + ']', language[key]);
    }
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    axios({
      url: routes.languages_url(),
      method: 'POST',
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      this.props.handleAfterCreated(response.data.language);
    })
    .catch(error => {
      console.log(error);
    });
  }
}
