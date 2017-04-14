import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import Errors from '../shareds/errors';
import * as app_constants from 'constants/app_constants';
import * as program_constants from '../programs/constants/program_constants';

export default class FormCreateProgram extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      errors: []
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Errors errors={this.state.errors} />
        <div className='form-group'>
          <input type='text' placeholder={I18n.t('sub_organizations.create')}
            className='form-control' ref='nameField'
            onChange={this.handleChange.bind(this)} />
        </div>
        <div className='form-group'>
          <div className='text-right'>
            <button type='submit'
              className='btn btn-primary' disabled={!this.formValid()} >
              {I18n.t('buttons.save')}
            </button>
          </div>
        </div>
      </form>
    );
  }

  handleChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  formValid() {
    return this.state.name != '';
  }

  handleSubmit(event) {
    event.preventDefault();
    let path = this.props.url + '/' + this.props.organization.id + '/' +
      program_constants.PROGRAMS_PATH;
    axios.post(path, {
      program: {
        name: this.refs.nameField.value
      }, authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
      .then(response => {
        this.refs.nameField.value = '';
        this.setState({name: ''});
        window.location.href = path + response.data.program.id;
      })
      .catch(error => this.setState({errors: error.response.data.errors}));
  }
}
