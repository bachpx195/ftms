import React from 'react';
import axios from 'axios';

import * as app_constants from 'constants/app_constants';

import UniversityPolicy from 'policy/university_policy';

const UNIVERSITIES_URL = app_constants.APP_NAME + 
  app_constants.UNIVERSITIES_PATH;

export default class Destroy extends React.Component {
  render() {
    return (
      <UniversityPolicy
        permit={[
          {action: ['destroy', 'creator'], target: 'children',
          data: {creator_id: this.props.university.creator_id}}]}>
        <button className='btn btn-danger'
          onClick={this.handleDelete.bind(this)}>
          <i className="fa fa-trash"></i>
          &nbsp;{I18n.t('buttons.delete')}
        </button>
      </UniversityPolicy>
    );
  }

  handleDelete(event) {
    let $target = $(event.target);
    $target.blur();

    if(confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(UNIVERSITIES_URL + '/' + this.props.university.id, {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        this.props.handleAfterDeleted(this.props.university);
      })
      .catch(error => console.log(error));
    }
  }
}
