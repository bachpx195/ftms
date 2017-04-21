import React from 'react';
import axios from 'axios';

import * as app_constants from 'constants/app_constants';

const SUBJECTS_URL = app_constants.APP_NAME + app_constants.SUBJECTS_PATH;

export default class Destroy extends React.Component {
  render() {
    return(
      <button className="btn btn-danger"
        onClick={this.handleDelete.bind(this)}>
        {I18n.t('buttons.delete')}
      </button>
    )
  }

  handleDelete() {
    if (confirm(I18n.t('data.confirm_delete'))) {
      const url = SUBJECTS_URL + '/' + this.props.project.course_subject.subject_id
        + '/' + app_constants.PROJECTS_PATH;
      axios.delete(this.props.url, {
        params: {authenticity_token: ReactOnRails.authenticityToken()},
        headers: {'Accept': 'application/json'}
      })
      .then(response => {window.location.href = url;})
      .catch(error => console.log(error));
    }
  }
}
