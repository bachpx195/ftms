import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import Errors from '../shareds/errors';
import _ from 'lodash';
import * as app_constants from 'constants/app_constants';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.evaluation_standard.name || '',
      min_point: props.evaluation_standard.min_point || 0,
      max_point: props.evaluation_standard.max_point || 0,
      average_point: props.evaluation_standard.average_point || 0,
      errors: null
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Errors errors={this.state.errors} />
        <div className='form-group'>
          <label>{I18n.t('evaluation_standards.headers.name')}</label>
          <input type='text' value={this.state.name}
            onChange={this.handleChange.bind(this)}
            className='form-control' name='name' />
        </div>
        <div className='form-group'>
          <label>{I18n.t('evaluation_standards.headers.min_point')}</label>
          <input type='number' value={this.state.min_point}
            onChange={this.handleChange.bind(this)}
            className='form-control' name='min_point' />
        </div>
        <div className='form-group'>
          <label>{I18n.t('evaluation_standards.headers.max_point')}</label>
          <input type='number' value={this.state.max_point}
            onChange={this.handleChange.bind(this)}
            className='form-control' name='max_point' />
        </div>
        <div className='form-group'>
          <label>{I18n.t('evaluation_standards.headers.average_point')}</label>
          <input type='number' value={this.state.average_point}
            onChange={this.handleChange.bind(this)}
            className='form-control' name='average_point' />
        </div>
        <div className='form-group'>
          <div className='text-right'>
            <button type='submit' className='btn btn-primary'
              disabled={!this.formValid()}>
              {I18n.t('buttons.save')}</button>
          </div>
        </div>
      </form>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.evaluation_standard.name || '',
      min_point: nextProps.evaluation_standard.min_point || 0,
      max_point: nextProps.evaluation_standard.max_point || 0,
      average_point: nextProps.evaluation_standard.average_point || 0,
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
    return this.state.name != '' && this.state.min_point > 0 &&
      this.state.max_point > 0 &&
      this.state.max_point > this.state.min_point &&
      this.state.average_point > 0 &&
      this.state.max_point > this.state.min_point;
  }

  handleSubmit(event) {
    event.preventDefault();
    let evaluation_standard = _.omit(this.state, 'errors');
    let method = this.props.evaluation_standard.id ? 'PATCH' : 'POST';
    axios({
      url: this.props.url,
      method: method,
      data: {
        evaluation_standard: evaluation_standard,
        authenticity_token: ReactOnRails.authenticityToken()
      },
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      $('#modal').modal('hide');
      this.props.handleAfterSaved(response.data.evaluation_standard);
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }
}
