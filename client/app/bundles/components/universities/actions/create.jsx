import React from 'react';
import axios from 'axios';
import * as app_constants from 'constants/app_constants';
import * as university_constants from '../constants/university_constants';

const UNIVERSITY_URL = app_constants.APP_NAME + university_constants.UNIVERSITY_PATH;

export default class Create extends React.Component {
  render() {
    return (
      <button type='submit' onClick={this.createUniversity.bind(this)}
        className='btn btn-primary'>
        {I18n.t('buttons.save')}
      </button>
     );
   }

  createUniversity(event) {
    event.preventDefault();
    let formData = new FormData();

    let university = _.omit(this.props.state, 'errors');

    for(let key of Object.keys(university)) {
      formData.append('university[' + key + ']', university[key]);
    }
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    axios({
      url: UNIVERSITY_URL,
      method: 'POST',
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      this.props.handleAfterCreated(response.data.university);
    })
    .catch(error => {
      console.log(error);
    });
  }
}
