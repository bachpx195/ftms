import React from 'react';
import axios from 'axios';

import * as app_constants from 'constants/app_constants';

export default class Create extends React.Component {
  render() {
    return (
      <div className='text-right'>
        <button type='submit' className='btn btn-primary'
          onClick={this.handleSubmit.bind(this)}>
          {I18n.t('buttons.save')}
        </button>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    let category = _.omit(this.props.state, 'errors');
    let formData = new FormData();
    for(let key of Object.keys(category)) {
      formData.append('category[' + key + ']', category[key]);
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
      this.props.handleAfterUpdated(response.data.category)
    })
    .catch(error => {
      this.setState({errors: error.response.data.errors})
    });
  }
}
