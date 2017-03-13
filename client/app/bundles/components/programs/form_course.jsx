import React from 'react';
import ReactOnRails from 'react-on-rails';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Errors from '../shareds/errors';
import _ from 'lodash';
import * as app_constants from 'constants/app_constants';

require('../sass/program_show.scss');

export default class FormCourse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      program_detail: {},
      image: {},
      changeImage: false,
      errors: null,
    };
  }

  render() {
    let image = '';
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
                <i className='fa fa-upload'></i>
                {I18n.t('course.select_image')}
              </button>
            </div>
          </div>
          <div className='hidden'>
            <Dropzone onDrop={this.onDrop.bind(this)}
              ref='dropzoneField'
              multiple={false} accept='image/*' />
          </div>
          <div className='image-preview image-course'>
            {image}
          </div>
        </div>
        <div className="form-group">
          <select className="form-control" name="language_id"
            onChange={this.handleChange.bind(this)}>
            <option value="">{I18n.t('course.select_languages')}</option>
            {this.renderOptions(this.state.program_detail.languages)}
          </select>
        </div>
        <div className="form-group">
          <select className="form-control" name="training_standard_id"
            onChange={this.handleChange.bind(this)}>
            <option value="">
              {I18n.t('course.select_training_standard')}
            </option>
            {this.renderOptions(this.state.program_detail.training_standards)}
          </select>
        </div>
        <div className='form-group'>
          <input type='text' placeholder={I18n.t('course.headers.name')}
            onChange={this.handleChange.bind(this)}
            className='form-control' name='name' />
        </div>
        <div className='form-group'>
          <input type='text' placeholder={I18n.t('course.headers.description')}
            onChange={this.handleChange.bind(this)}
            className='form-control' name='description' />
        </div>
        <div className='col-sm-6 course-start-date'>
          <label>{I18n.t('course.start_date')}</label>
          <input type='date' onChange={this.handleChange.bind(this)}
            name='start_date' className='form-control'/>
        </div>

        <div className='col-sm-6 course-end-date'>
          <label>{I18n.t('course.end_date')}</label>
          <input type='date' onChange={this.handleChange.bind(this)}
            name='end_date' className='form-control' />
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

  renderOptions(objects){
    if (objects){
      return objects.map(object => {
        return <option key={object.id}
          value={object.id}>{object.name}</option>;
      });
    }
    return null;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      program_detail: nextProps.program_detail,
      changeImage: false,
      errors: null
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
    let course = _.omit(this.state, 'errors');
    if(!this.state.changeImage) {
      course = _.omit(course, 'image');
    }
    let formData = new FormData();
    for(let key of Object.keys(course)) {
      formData.append('course[' + key + ']', course[key]);
    }
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    axios.post(this.props.url,
      formData
    , app_constants.AXIOS_CONFIG)
    .then(response => {
      $('#modalEdit').modal('hide');
      this.setState({
        program_detail: {},
        image: '',
        changeImage: false,
      });
      this.props.handleAfterSaved(response.data.course);
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }
}
