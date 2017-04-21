import * as app_constants from 'constants/app_constants';
import axios from 'axios';
import CategoryPolicy from 'policy/category_policy';
import React from 'react';

const CATEGORIES_URL = app_constants.APP_NAME + app_constants.CATEGORIES_PATH;

export default class Destroy extends React.Component {
  render() {
    return (
      <div>
        <CategoryPolicy
          permit={[
            {action: ['destroy', 'creator'], target: 'children',
              data: {creator_id: this.props.category.creator_id}}]}>
          <button className='btn btn-danger'
            onClick={this.handleDelete.bind(this)}>
            <i className="fa fa-trash"></i>
            &nbsp;{I18n.t('buttons.delete')}
          </button>
        </CategoryPolicy>
      </div>
    );
  }

  handleDelete(event) {
    let $target = $(event.target);
    $target.blur();
    if(confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(CATEGORIES_URL + '/' + this.props.category.id, {
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
