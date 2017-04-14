import React from 'react';
import axios from 'axios';

export default class Destroy extends React.Component {
  render() {
    return (
      <button className='btn btn-danger'
        onClick={this.handleDelete.bind(this)}>
        {I18n.t('buttons.delete')}
      </button>
     );
   }

  handleDelete(event) {
    let $target = $(event.target);
    $target.blur();
    if(confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(this.props.url + '/' + this.props.stage.id, {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        this.props.handleAfterDeleted(this.props.stage);
      })
      .catch(error => console.log(error));
    }
  }
}