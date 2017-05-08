import React from 'react';
import axios from 'axios';

import * as routes from 'config/routes';

export default class Destroy extends React.Component {
  render() {
    return(
      <button className="btn btn-danger"
        onClick={this.handleDelete.bind(this)}>
        <i className='fa fa-trash'></i>
        &nbsp;{I18n.t('buttons.delete')}
      </button>
    )
  }

  handleDelete() {
    if (confirm(I18n.t('data.confirm_delete'))) {
      const projects_url = routes.subject_projects_url(
        this.props.project.course_subject.subject_id);
      axios.delete(this.props.url, {
        params: {authenticity_token: ReactOnRails.authenticityToken()},
        headers: {'Accept': 'application/json'}
      })
      .then(response => {window.location.href = projects_url;})
      .catch(error => console.log(error));
    }
  }
}
