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
      name: props.standard_organization.name || '',
      description: props.standard_organization.description || '',
      errors: null
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Errors errors={this.state.errors} />

        <div className='form-group row'>
          <lable className='col-md-2'>{I18n.t('training_standards.headers.name')}</lable>
          <div className='col-md-10'>
            <input type='text'
              value={this.state.name} ref='nameField'
              onChange={this.handleChange.bind(this)}
              className='form-control' name='name' />
          </div>
        </div>

        <div className='form-group row'>
          <lable className='col-md-2'>{I18n.t('training_standards.headers.description')}</lable>
          <div className='col-md-10'>

            <input type='text'
              value={this.state.description} ref='nameField'
              onChange={this.handleChange.bind(this)}
              className='form-control' name='description' />
          </div>
        </div>

        <div className='form-group'>
          <div className='text-right'>
            <button type='submit' disabled={!this.formValid()} className='btn btn-primary'
              title={I18n.t('buttons.save')}>
              {I18n.t('buttons.save')}</button>
          </div>
        </div>
      </form>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.standard_organization.name || '',
      description: nextProps.standard_organization.description || '',
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
    return this.state.name != '' && this.state.description != ''
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();

    let standard_organization = _.omit(this.state, 'errors');

    for(let key of Object.keys(standard_organization)) {
      formData.append('standard_organization[' + key + ']', standard_organization[key]);
    }
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    let method = this.props.standard_organization.id ? 'PUT' : 'POST';
    axios({
      url: this.props.url,
      method: method,
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      if(this.props.standard_organization.id) {
        $('#modalEdit').modal('hide');
      } else {
        this.setState({
          name: '',
          description: '',
          errors: null,
        });
      }
      this.props.handleAfterSaved(response.data.standard_organization);
    })
    .catch(error => {
      this.setState({errors: error.response.data.errors});
    });
  }
}
