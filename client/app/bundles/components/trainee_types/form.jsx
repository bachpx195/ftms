import React from 'react';
import ReactOnRails from 'react-on-rails';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Errors from '../shareds/errors';
import _ from 'lodash';
import * as app_constants from 'constants/app_constants';

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.trainee_type.name || '',
      errors: null
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Errors errors={this.state.errors} />
        <div className='form-group'>
          <input type='text' placeholder={I18n.t('trainee_types.headers.name')}
            value={this.state.name} ref='nameField'
            onChange={this.handleChange.bind(this)}
            className='form-control' name='name' />
        </div>
        <div className='form-group'>
          <div className='text-right'>
            <button type='submit' disabled={!this.formValid()} className='btn btn-primary'>
              {I18n.t('buttons.save')}</button>
          </div>
        </div>
      </form>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.trainee_type.name || '',
      errors: null
    });
  }

  handleChange(event) {
    let attribute = event.target.name;
    this.setState({
      [attribute]: event.target.value
    });
  }

  formValid(){
    return this.state.name != '';
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();

    let trainee_type = _.omit(this.state, 'errors');

    for(let key of Object.keys(trainee_type)) {
      formData.append('trainee_type[' + key + ']', trainee_type[key]);
    }
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    let method = this.props.trainee_type.id ? 'PUT' : 'POST';
    axios({
      url: this.props.url,
      method: method,
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      if(this.props.trainee_type.id) {
        $('#modalEdit').modal('hide');
      } else {
        this.setState({
          name: '',
          errors: null,
        });
      }
      this.props.handleAfterSaved(response.data.trainee_type);
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }
}
