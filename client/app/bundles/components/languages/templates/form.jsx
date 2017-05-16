import React from 'react';
import ReactOnRails from 'react-on-rails';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Create from '../actions/create';
import Update from '../actions/update';

import Errors from 'shared/errors';

import _ from 'lodash';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.language.name || '',
      image: props.language.image || null,
      description: props.language.description || '',
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
    let action = '';
    if (this.props.language.id) {
      action = <Update
        url={this.props.url}
        state={this.state}
        language={this.props.language}
        handleAfterUpdated={this.props.handleAfterUpdated}
      />
    } else {
      action = <Create
        state={this.state}
        language={this.props.language}
        handleAfterCreated={this.props.handleAfterCreated}
      />
    }
    return (
      <form>
        <Errors errors={this.state.errors} />
        <div className='form-group'>
          <div className='dropzone'>
            <div className='form-group'>
              <button type='button' className='btn btn-danger btn-select-file'
                onClick={this.onOpenClick.bind(this)}>
                <i className='fa fa-upload'></i>
                &nbsp;{I18n.t('dropzones.select_image')}
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
          <input type='text' placeholder={I18n.t('languages.headers.name')}
            value={this.state.name} onChange={this.handleChange.bind(this)}
            className='form-control' name='name' />
        </div>
        <div className='form-group'>
          <input type='text' placeholder={I18n.t('languages.headers.description')}
            value={this.state.description} onChange={this.handleChange.bind(this)}
            className='form-control' name='description' />
        </div>
        <div className='form-group'>
          <div className='text-right'>
            {action}
          </div>
        </div>
      </form>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.language.name || '',
      description: nextProps.language.description || '',
      image: nextProps.language.image || null,
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

  formValid(){
    return this.state.name != '' && this.state.image && this.state.description;
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
}
