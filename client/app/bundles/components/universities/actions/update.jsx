import React from 'react';
import axios from 'axios';

import * as app_constants from 'constants/app_constants';
import * as university_constants from '../constants/university_constants';

import UniversityPolicy from 'policy/university_policy';

import Modal from '../templates/modal';

const UNIVERSITY_URL = app_constants.APP_NAME + university_constants.UNIVERSITY_PATH;

export default class Update extends React.Component {
  render() {
    return (
      <button className='btn btn-info' onClick={this.handleSubmit.bind(this)}>
        <i className="fa fa-floppy-o"></i>
        &nbsp;{I18n.t('buttons.save')}
      </button>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();
    let university = _.omit(this.props.state, 'errors');

    for(let key of Object.keys(university)) {
      formData.append('university[' + key + ']', university[key]);
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
      this.props.handleAfterUpdated(response.data.university);
    })
    .catch(error => {
      console.log(error);
    });
  }
}
