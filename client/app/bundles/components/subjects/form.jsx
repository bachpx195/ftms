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
      name: props.subject.name || '',
      image: props.subject.image || null,
      description: props.subject.description || '',
      changeImage: false,
      errors: null
    };
  }

  render() {
    let image = null;
    if(this.state.image){
      if(this.state.image.url) {
        image = <img src={this.state.image.url} />;
      } else if(this.state.image.preview){
        image = <img src={this.state.image.preview} />;
      }
    }
    return (
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
          <div className='image-preview'>
            {image}
          </div>
        </div>
        <div className='form-group'>
          <input type='text' placeholder={I18n.t('subjects.headers.name')}
            value={this.state.name} onChange={this.handleChange.bind(this)}
            className='form-control' name='name' />
        </div>
        <div className='form-group'>
          <input type='text' placeholder={I18n.t('subjects.headers.description')}
            value={this.state.description} onChange={this.handleChange.bind(this)}
            className='form-control' name='description' />
        </div>
        <div className='form-group'>
          <div className='text-right'>
            <button type='submit' className='btn btn-primary'>
              {I18n.t('buttons.save')}</button>
          </div>
        </div>
      </form>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.subject.name || '',
      description: nextProps.subject.description || '',
      image: nextProps.subject.image || null,
      errors: null,
      changeImage: false
    });
  }

  handleChange(event) {
    let attribute = event.target.name;
    this.setState({
      [attribute]: event.target.value
    });
  }

  onDrop(acceptedFiles, rejectedFiles) {
    this.setState({
      image: acceptedFiles[0],
      changeImage: true
    });
  }

  onOpenClick() {
    this.refs.dropzoneField.open();
  }

  handleSubmit(event) {
    event.preventDefault();
    let subject = _.omit(this.state, 'errors');
    if(!this.state.changeImage) {
      subject = _.omit(subject, 'image');
    }
    let formData = new FormData();
    for(let key of Object.keys(subject)) {
      formData.append('subject[' + key + ']', subject[key]);
    }
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    let method = this.props.subject.id ? 'PUT' : 'POST';
    axios({
      url: this.props.url,
      method: method,
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      if(this.props.subject.id) {
        $('#modalEdit').modal('hide');
      } else {
        this.setState({
          name: '',
          description: '',
          image: null,
          errors: null,
          changeImage: false
        });
      }
      this.props.handleAfterSaved(response.data.subject);
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }
}
