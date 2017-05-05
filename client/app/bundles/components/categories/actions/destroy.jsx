import * as routes from 'config/routes';
import axios from 'axios';
import CategoryPolicy from 'policy/category_policy';
import React from 'react';

export default class Destroy extends React.Component {
  render() {
    return (
      <CategoryPolicy
        permit={[{action: ['destroy', 'creator'], target: 'children',
          data: {creator_id: this.props.category.creator_id}}]}>
        <button className='btn btn-danger'
          onClick={this.handleDelete.bind(this)}
          title={I18n.t('buttons.delete')}>
          <i className='fa fa-trash'></i>
        </button>
      </CategoryPolicy>
    );
  }

  handleDelete(event) {
    let $target = $(event.target);
    $target.blur();
    if (confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(routes.category_url(this.props.category.id), {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        this.props.handleAfterDeleted(this.props.category);
      })
      .catch(error => {
        console.log(error)}
      );
    }
  }
}
