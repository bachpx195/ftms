import axios from 'axios';
import React from 'react';

import * as app_constants from 'constants/app_constants';

export default class Create extends React.Component {
  render() {
    return (
      <div className='text-right save-question'>
        <button type='submit' className='btn btn-primary'
          onClick={this.handleSubmit.bind(this)}>
          <i className="fa fa-floppy-o"></i>
          &nbsp;{I18n.t('buttons.save')}
        </button>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append('question[content]', this.props.question.content);
    this.props.question.answers.map((answer, answer_index) => {
      formData.append('question[answers_attributes][' + answer_index +
        '][content]', answer.content);
      formData.append('question[answers_attributes][' + answer_index +
        '][is_correct]', answer.is_correct);
    });
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    axios({
      url: this.props.url,
      method: 'POST',
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      this.props.afterCreateQuestion(response.data.question);
    })
    .catch(error => {
      this.setState({errors: error.response.data.message})
    });
  }
}
