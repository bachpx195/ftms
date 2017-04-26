import axios from 'axios';
import React from 'react';

export default class Create extends React.Component {
  render() {
    return (
      <div>
        <div className='text-right'>
          <button type='submit' className='btn btn-primary'
            onClick={this.handleSubmit.bind(this)}>
            <i className="fa fa-floppy-o"></i>
            &nbsp;{I18n.t('buttons.save')}
          </button>
        </div>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    let category = _.omit(this.props.state, 'errors');
    let formData = new FormData();
    for(let key of Object.keys(category)) {
      formData.append('category[' + key + ']', category[key]);
    }

    formData.append('authenticity_token', ReactOnRails.authenticityToken());

    axios.post(this.props.url + '.json', formData)
    .then(response => {
      this.setState({
        name: '',
        description: '',
        errors: null,
      });
      this.props.handleAfterCreated(response.data.category)
    })
    .catch(error => {
      this.setState({errors: error.response.data.errors})
    });
  }
}
