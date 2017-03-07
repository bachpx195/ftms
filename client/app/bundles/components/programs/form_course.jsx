import React from 'react';
import ReactOnRails from 'react-on-rails';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Errors from '../shareds/errors';
import _ from 'lodash';

require('../sass/program_show.scss');

export default class FormCourse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      program_detail: {},
      course: {},
      id: props.course.id || '',
      image: props.course.image || '',
      changeImage: false,
      errors: null,
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
          <div className='image-preview'>
            {image}
          </div>
        </div>
        <div className="form-group">
          <select className="form-control" name="language_id"
            value={this.state.course.language_id || ''} ref="nameField"
            onChange={this.handleChange.bind(this)}>
            <option value="">{I18n.t('course.select_languages')}</option>
            {this.renderOptions(this.state.program_detail.languages)}
          </select>
        </div>
        <div className='form-group'>
          <input type='text' placeholder={I18n.t('course.headers.name')}
            value={this.state.course.name || ''} ref="nameField"
            onChange={this.handleChange.bind(this)}
            className='form-control' name='name' />
        </div>
        <div className='form-group'>
          <input type='text' placeholder={I18n.t('course.headers.description')}
            value={this.state.course.description || ''} ref="nameField"
            onChange={this.handleChange.bind(this)}
            className='form-control' name='description' />
        </div>
        <div className='form-group'>
          <input type='hidden' onChange={this.handleChange.bind(this)}
            value={this.props.program.id} name='program_id' />
        </div>
        <div className="form-group">
          <select className="form-control" name="status"
            value={this.state.course.status || ''} ref="nameField"
            onChange={this.handleChange.bind(this)}>
            <option value="">{I18n.t('course.select_status')}</option>
            {this.renderOptionStatus()}
          </select>
        </div>

        <div className='col-sm-6 course-start-date'>
          <label>{I18n.t('course.start_date')}</label>
          <input type='date' onChange={this.handleChange.bind(this)}
            value={this.state.course.start_date || ''} name='start_date' 
            className='form-control' ref="nameField" />
        </div>

        <div className='col-sm-6 course-end-date'>
          <label>{I18n.t('course.end_date')}</label>
          <input type='date' onChange={this.handleChange.bind(this)}
            value={this.state.course.end_date || ''} name='end_date' 
            className='form-control' ref="nameField" />
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

  renderOptionStatus(){
    let statuses = this.state.program_detail.statuses;
    if (statuses){
      return Object.keys(statuses).map(key => {
        return <option key={statuses[key]}
          value={key}>{I18n.t('course.' + key)}</option>;
      });
    }
    return null;
  }

  renderOptions(Objects){
    if (Objects){
      return Objects.map(object => {
        return <option key={object.id}
          value={object.id}>{object.name}</option>;
      });
    }
    return null;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      program_detail: nextProps.program_detail,
      course: nextProps.course,
      id: nextProps.course.id || '',
      image: nextProps.course.image || '',
      changeImage: false,
      errors: null
    });
  }

  handleChange(event) {
    let attribute = event.target.name;
    Object.assign(this.state.course, {[attribute]: event.target.value});
    this.setState({
      course: this.state.course
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
    var form_data = $('form').serializeArray();
    let formData = new FormData();
    for(let obj of form_data) {
      formData.append('course[' + obj.name + ']', obj.value);
    }
    let course = _.omit(this.state, 'errors');
    if(this.state.changeImage) {
      formData.append('course[image]', course.image);
    }
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    let methd = this.props.course.id ? 'PUT' : 'POST';
    let path = this.props.url;
    if (this.props.course.id){
      path = this.props.url + '/' + this.state.id;
    }
    axios({
      url: path,
      method: methd,
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      $('#modalEdit').modal('hide');
      this.refs.nameField.value = '';
      this.setState({
        program_detail: {},
        course: {},
        image: null,
        errors: null,
        changeImage: false
      });
      if(this.state.id){
        this.props.handleAfterUpdate(response.data.course)
      }
      else{
        this.props.handleAfterSaved(response.data.course);
      }
    })
    .catch(error => console.log(error));
  }
}
