import React from 'react';
import axios from 'axios';
import * as routes from 'config/routes';

export default class Create extends React.Component {
  render() {
    return (
      <button type='submit' onClick={this.createStatus.bind(this)}
        className='btn btn-primary'>
        <i className='fa fa-floppy-o'></i>
        &nbsp;{I18n.t('buttons.save')}
      </button>
     );
   }

  createStatus(event) {
    event.preventDefault();
    let formData = new FormData();

    let user_status = _.omit(this.props.state, 'errors');

    for(let key of Object.keys(user_status)) {
      formData.append('user_status[' + key + ']', user_status[key]);
    }
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    axios({
      url: routes.user_statuses_url() + '.json',
      method: 'POST',
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      this.props.handleAfterCreated(response.data.user_status);
    })
    .catch(error => {
      console.log(error);
    });
  }
}
