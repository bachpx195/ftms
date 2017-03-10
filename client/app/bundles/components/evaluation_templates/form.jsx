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
      name: props.evaluation_template.name || '',
      errors: null
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Errors errors={this.state.errors} />
        <div className='form-group'>
          <input type='text' value={this.state.name} name='name'
            onChange={this.handleChange.bind(this)} className='form-control'
            placeholder={I18n.t('evaluation_templates.headers.name')} />
        </div>
        <div className='form-group'>
          <div className='text-right'>
            <button type='button' className='btn btn-default'
              onClick={this.handleCancel.bind(this)}>
              {I18n.t('buttons.cancel')}</button>
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
      name: nextProps.evaluation_template.name || '',
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

  handleCancel(event) {
    event.preventDefault();
    this.props.handleCancel();
  }

  handleSubmit(event) {
    event.preventDefault();
    let evaluation_template = _.omit(this.state, 'errors');
    let method = this.props.evaluation_template.id ? 'PATCH' : 'POST';
    axios({
      url: this.props.url,
      method: method,
      data: {
        evaluation_template: {
          name: this.state.name
        },
        authenticity_token: ReactOnRails.authenticityToken()
      },
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      this.setState({
        name: '',
        errors: null
      });
      this.props.handleAfterSaved(response.data.evaluation_template);
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }
}
