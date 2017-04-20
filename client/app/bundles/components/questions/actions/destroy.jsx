import axios from 'axios';
import React from 'react';

export default class Destroy extends React.Component {
  render() {
    return (
      <div>
        <a onClick={this.afterClickDeleteQuestion.bind(this)}>
          <i className='fa fa-trash'></i>
        </a>
      </div>
    );
  }

  afterClickDeleteQuestion(event) {
    if(confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(this.props.url, {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        this.props.afterDeleteQuestion(this.props.question);
      })
      .catch(error => {
        console.log(error)
      });
    }
  }
}
