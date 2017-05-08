import axios from 'axios';
import Errors from '../../shareds/errors';
import React from 'react';
import ReactOnRails from 'react-on-rails';
import _ from 'lodash';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requirement: props.requirement,
      errors: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      requirement: nextProps.requirement,
      errors: null,
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Errors errors={this.state.errors} />
        <div className='form-group'>
          <input type='text' placeholder={I18n.t('projects.headers.name')}
            value={this.state.requirement.name || ''}
            onChange={this.handleChange.bind(this)}
            className='form-control' name='name' />
        </div>
        <div className='form-group'>
          <label>{I18n.t('projects.priority')}</label>
          <input type='number' value={this.state.requirement.priority || ''}
            onChange={this.handleChange.bind(this)}
            className='form-control' name='priority' min='0' />
        </div>
        <div className='form-group'>
          <div className='text-right'>
            <button type='submit' className='btn btn-primary'
              disabled={!this.formValid()}>
              <i className='fa fa-floppy-o'></i>
              &nbsp;{I18n.t('buttons.save')}
            </button>
          </div>
        </div>
      </form>
    );
  }

  formValid() {
    return this.state.requirement.name != undefined &&
      this.state.requirement.priority != undefined;
  }

  handleChange(event) {
    let attribute = event.target.name;
    Object.assign(this.state.requirement, {[attribute]: event.target.value});
    this.setState({
      requirement: this.state.requirement,
      url: this.state.url
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let requirement = this.state.requirement;
    let formData = new FormData();
    for (let key of Object.keys(requirement)) {
      formData.append('requirement[' + key + ']', requirement[key]);
    }
    if (Object.keys(requirement).length == 0) {
      formData.append('requirement[key]', null);
    }
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    let method = this.props.requirement.id ? 'PUT' : 'POST';
    axios({
      url: this.props.url + '.json',
      method: method,
      data: formData,
    })
    .then(response => {
      $('#modalRequirement').modal('hide');
      this.setState({
        requirement: {},
        changeImage: false,
      });
      if (this.props.requirement.id) {
        this.props.handleAfterEdit(response.data.requirement);
      } else {
        this.props.handleAfterSubmit(response.data.requirement);
      }
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }
}
