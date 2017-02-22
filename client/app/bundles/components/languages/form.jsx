import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import Errors from '../shareds/errors';
import * as app_constants from 'constants/app_constants';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      language: this.props.language,
      errors: null
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Errors errors={this.state.errors} />
        <div className='form-group'>
          <input type='text' placeholder={I18n.t('languages.headers.name')}
            value={this.state.language.name}
            className='form-control' name='name' ref='nameField'
            onChange={this.handleChange.bind(this)} />
        </div>
        <div className='form-group'>
          <div className='text-right'>
            <button type="submit" className="btn btn-primary"
              disabled={!this.formValid()}>{I18n.t('buttons.save')}</button>
          </div>
        </div>
      </form>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      language: nextProps.language,
      errors: null
    });
  }

  handleChange(event) {
    let attribute = event.target.name;
    let language = Object.assign({}, this.state.language,
      {[attribute]: event.target.value});
    this.setState({
      language: language
    });
  }

  formValid(){
    return this.state.language.name != '';
  }

  handleSubmit(event) {
    event.preventDefault();
    let request = null;
    if(this.state.language.id){
      request = axios.patch(this.props.url, {
        language: {
          name: this.refs.nameField.value
        },
        authenticity_token: ReactOnRails.authenticityToken()
      }, app_constants.AXIOS_CONFIG);
    } else {
      request = axios.post(this.props.url, {
        language: {
          name: this.refs.nameField.value
        },
        authenticity_token: ReactOnRails.authenticityToken()
      }, app_constants.AXIOS_CONFIG);
    }
    request.then(response => {
      $('#modalEdit').modal('hide');
      this.props.handleAfterSaved(response.data.language);
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }
}
