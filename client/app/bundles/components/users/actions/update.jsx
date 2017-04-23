import React from 'react';
import axios from 'axios';
import * as routes from 'config/routes';

export default class Create extends React.Component {
  render() {
    return (
      <button className='btn btn-primary'
        onClick={this.handleSubmit.bind(this)}>
        {I18n.t('users.buttons.update')}</button>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    let user = _.omit(this.props.state.user, 'avatar');
    let profile = this.props.state.profile;
    let formData = new FormData();
    for(let key of Object.keys(user)) {
      formData.append('user[' + key + ']', user[key]);
    }
    for(let key of Object.keys(profile)) {
      formData.append('user[profile_attributes][' + key + ']', profile[key]);
    }
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    let url = this.props.url + user.id;
    axios({
      url: url,
      method: 'PATCH',
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      window.location.href = user_url(response.data.user_detail.id);
    })
    .catch(error => {this.props.handleErrors(error.response.data.errors);});
  }
}
