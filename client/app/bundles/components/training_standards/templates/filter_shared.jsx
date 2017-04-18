import * as app_constants from 'constants/app_constants';
import * as training_standard_constants from '../constants/training_standard_constants';
import axios from 'axios';
import React from 'react';

export default class FilterShared extends React.Component {
  render() {
    return (
      <div className='col-md-4'>
        <select className='form-control'
          onChange={this.handleChange.bind(this)}>
          <option value='false'>
            {I18n.t('training_standards.titles.owned')}
          </option>
          <option value='true'>
            {I18n.t('training_standards.titles.shared_with')}
          </option>
        </select>
      </div>
    )}

  handleChange(event) {
    const TRAINING_STANDARDS_URL = app_constants.APP_NAME +
      training_standard_constants.ORGANIZATION_PATH
      + '/' + this.props.organization.id + '/' +
      training_standard_constants.TRAINING_STANDARD_PATH;

    let is_shared = event.target.value;

    axios({
      url: TRAINING_STANDARDS_URL,
      method: 'GET',
      params: {'is_shared': is_shared},
      headers: {'Accept': 'application/json'}
    }).then(response => {
      this.toggleAddButton(is_shared);
      this.props.handleAfterFilterShared(response.data.training_standards);
    }).catch(error => {
      this.setState({errors: error.response.data.errors});
    });
  }

  toggleAddButton(is_shared) {
    if (is_shared == "true") {
      $('.create-subject').hide();
    } else {
      $('.create-subject').show();
    }
  }
}
