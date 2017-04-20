import axios from 'axios';
import React from 'react';

export default class Destroy extends React.Component {
  render() {
    return (
      <i className="fa fa-trash-o"
        onClick={this.handleDelete.bind(this)}>
      </i>
    );
  }

  handleDelete(event) {
    let $target = $(event.target);
    $target.blur();

    if(confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(this.props.url, {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        this.props.handleAfterDeleted(response);
      })
      .catch(error => console.log(error));
    }
  }
}
