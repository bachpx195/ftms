import React from 'react';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import Errors from '../shareds/errors';
import * as app_constants from 'constants/app_constants';

export default class FormEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: null,
      name: props.user ? props.user.name : '',
      email: props.user ? props.user.email : '',
      avatar: props.avatar,
      changeImage: false,
    }
  }

  render() {
    let avatar = null;
    if(this.state.avatar) {
      if(this.state.avatar.url) {
        avatar = <img src={this.state.avatar.url}
          className='img-size-50p' />;
      } else if(this.state.avatar.preview) {
        avatar = <img src={this.state.avatar.preview}
          className='img-size-50p' />;
      }
    }
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <Errors errors={this.state.errors} />

        <div className='form-group'>
          <div className='dropzone'>
            <div className='form-group'>
              <button type='button' className='btn btn-danger btn-select-file'
                onClick={this.onOpenClick.bind(this)}>
                <i className='fa fa-upload'></i> {I18n.t('dropzones.select_image')}
              </button>
            </div>
          </div>
          <div className='hidden'>
            <Dropzone onDrop={this.onDrop.bind(this)} ref='dropzoneField'
              multiple={false} accept='image/*' />
          </div>
          <div className='image-preview image-center'>
            {avatar}
          </div>
        </div>

        <div className='form-group'>
          <span>{I18n.t('users.name')}</span>
          <input type='text' placeholder={I18n.t('users.edit')}
            className='form-control' name='name' ref='nameField'
            value={this.state.name || ''}
            onChange={this.handleChange.bind(this)} />
        </div>

        <div className='form-group'>
          <span>{I18n.t('users.email')}</span>
          <input type='text' placeholder={I18n.t('users.edit')}
            className='form-control' name='email' ref='emailField'
            value={this.state.email || ''}
            onChange={this.handleChange.bind(this)} />
        </div>

        <div className='form-group'>
          <div className='text-right'>
            <button type='submit' className='btn btn-primary'
              disabled={!this.formValid()}>{I18n.t('users.buttons.save')}</button>
          </div>
        </div>

      </form>
    )
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      avatar: nextProps.avatar,
      email: nextProps.user.email,
      name: nextProps.user.name
    })
  }

  handleChange(event) {
    let attribute = event.target.name;
    let value = event.target.value;
    this.setState({
      [attribute]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let user = _.omit(this.state, 'errors');
    if(!this.state.changeImage) {
      user = _.omit(user, 'avatar');
    }
    let formData = new FormData();
    for(let key of Object.keys(user)) {
      formData.append('user[' + key + ']', user[key]);
    }
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    let method = 'PATCH';
    axios({
      url: this.props.url + this.props.user.id,
      method: method,
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      this.setState({
        errors: null,
        changeImage: false,
        name: '',
        email: '',
      });
      this.props.handleAfterSaved(response.data.user);
      $('#modal').modal('hide');
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }

  formValid() {
    return this.state.name != '';
  }

  onOpenClick() {
    this.refs.dropzoneField.open();
  }

  onDrop(acceptedFiles, rejectedFiles) {
    this.setState({
      avatar: acceptedFiles[0],
      changeImage: true
    });
  }
}
