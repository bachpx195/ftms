import React from 'react';
import ReactOnRails from 'react-on-rails';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import _ from 'lodash';
import * as app_constants from 'constants/app_constants';

const POLICIES = app_constants.POLICIES;

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.training_standard.name || '',
      description: props.training_standard.description || '',
      policy: props.training_standard.policy || POLICIES[0].id,
      errors: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.training_standard.name || '',
      description: nextProps.training_standard.description || '',
      policy: nextProps.training_standard.policy || POLICIES[0].id,
      errors: null
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className='form-group row'>
          <lable className='col-md-2'>
            {I18n.t('training_standards.headers.name')}
          </lable>
          <div className='col-md-10'>
            <input type='text'
              value={this.state.name} ref='nameField'
              onChange={this.handleChange.bind(this)}
              className='form-control' name='name' />
          </div>
        </div>

        <div className='form-group row'>
          <lable className='col-md-2'>
            {I18n.t('training_standards.headers.description')}
          </lable>
          <div className='col-md-10'>
            <input type='text'
              value={this.state.description} ref='nameField'
              onChange={this.handleChange.bind(this)}
              className='form-control' name='description' />
          </div>
        </div>

        <div className='form-group row'>
          <lable className='col-md-2'>
            {I18n.t('training_standards.headers.policy')}
          </lable>
          <div className='col-md-10'>
            <select className="form-control"
              value={this.state.policy} name='policy'
              onChange={this.handleChange.bind(this)}>
              {this.renderOptions(POLICIES)}
            </select>
          </div>
        </div>

        <div className='form-group'>
          <div className='text-right'>
            <button type='submit' className='btn btn-primary'
              onClick={this.handleSubmit.bind(this)}>
              {I18n.t('buttons.save')}</button>
          </div>
        </div>
      </form>
    );
  }

  handleChange(event) {
    let attribute = event.target.name;
    this.setState({
      [attribute]: event.target.value
    });
  }

  formValid() {
    return this.state.name != '' && this.state.description != ''
  }

  renderOptions(objects) {
    if (objects) {
      return objects.map(object => {
        return (
          <option key={object.id} value={object.id}>
            {object.name}
          </option>);
      });
    }
    return null;
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();

    let training_standard = _.omit(this.state, 'errors');

    for(let key of Object.keys(training_standard)) {
      formData.append('training_standard[' + key + ']', training_standard[key]);
    }
    if (this.props.training_standard.id == null) {
      formData.append('training_standard[organization_id]',
        this.props.organization.id);
    }
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    let method = this.props.training_standard.id ? 'PUT' : 'POST';
    axios({
      url: this.props.url,
      method: method,
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      if(this.props.training_standard.id) {
        $('.modalCreateTrainingStandard').modal('hide');
        $('.modal-edit').modal('hide');
      } else {
        this.setState({
          name: '',
          description: '',
          policy: POLICIES[0].id,
          errors: null,
        });
      }
      this.props.handleAfterSaved(response.data.training_standard);
    })
    .catch(error => {
      this.setState({errors: error.response.data.errors});
    });
  }
}
