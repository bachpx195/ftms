import React from 'react';
import axios from 'axios';

import * as routes from 'config/routes';

import UniversityPolicy from 'policy/university_policy';

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
      axios.delete(routes.university_url(this.props.university.id), {
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
