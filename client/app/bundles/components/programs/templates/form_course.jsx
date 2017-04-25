import _ from 'lodash';
import axios from 'axios';
import CourseLists from '../courses';
import Dropzone from 'react-dropzone';
import React from 'react';
import ReactOnRails from 'react-on-rails';
import SubjectLists from '../subjects';
import UserLists from '../user_lists';
import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';

require('../../../assets/sass/program_show.scss');

export default class FormCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url,
      url_programs: props.url_programs,
      program_detail: {},
      course: {},
      image: {},
      changeImage: false,
      errors: null,
      all_roles: props.all_roles,
      owners: props.owners
    };
  }

  render() {
    let image = '';
    if (this.state.image) {
      if (this.state.image.url) {
        image = <img src={this.state.image.url} />;
      } else if (this.state.image.preview) {
        image = <img src={this.state.image.preview} />;
      }
    }
    return (
      <form onSubmit={this.handleSubmit.bind(this)}
        encType="multipart/form-data">
        <div className='form-group'>
          <div className='dropzone'>
            <div className='form-group'>
              <button type='button' className='btn btn-danger btn-select-file'
                onClick={this.onOpenClick.bind(this)}>
                <i className='fa fa-upload'></i>
                {I18n.t('courses.select_image')}
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
        <div className='form-group'>
          <select className='form-control' name='language_id'
            onChange={this.handleChange.bind(this)}>
            <option value=''>{I18n.t('courses.select_languages')}</option>
            {this.renderOptions(this.state.program_detail.languages)}
          </select>
        </div>
        <div className='form-group'>
          <select className='form-control' name='training_standard_id'
            onChange={this.handleChange.bind(this)}>
            <option value=''>
              {I18n.t('courses.select_training_standard')}
            </option>
            {this.renderOptions(this.state.program_detail.training_standards)}
          </select>
        </div>
        <div className='form-group'>
          <input type='text' placeholder={I18n.t('courses.headers.name')}
            onChange={this.handleChange.bind(this)}
            className='form-control' name='name' />
        </div>
        <div className='form-group'>
          <input type='text' placeholder={I18n.t('courses.headers.description')}
            onChange={this.handleChange.bind(this)}
            className='form-control' name='description' />
        </div>
        <div className='form-group'>
          <input type='hidden' onChange={this.handleChange.bind(this)}
            value={this.props.program.id} name='program_id' />
        </div>

        <div className='nht-course-date'>
          <div className='col-sm-6 course-start-date'>
            <label>{I18n.t('courses.start_date')}</label>
            <input type='date' onChange={this.handleChange.bind(this)}
              name='start_date' className='form-control'/>
          </div>

          <div className='col-sm-6 course-end-date'>
            <label>{I18n.t('courses.end_date')}</label>
            <input type='date' onChange={this.handleChange.bind(this)}
              name='end_date' className='form-control' />
          </div>
        </div>

        <div className='nht-assign-owner'>
          <label>{I18n.t('courses.select_owner_role')}</label>
          <select className='nht-list-roles form-control'
            onChange={this.handleChangeRole.bind(this)} id='list-roles'>
            <option value=''>{I18n.t('courses.select_owner_role')}</option>
            {this.renderOptions(this.state.all_roles)}
          </select>

          <label>{I18n.t('courses.owners')}</label>
          <select className='nht-list-owners form-control' id='list-owners'
            name='owner_id' onChange={this.handleChange.bind(this)}>
            <option value=''>{I18n.t('courses.select_owner')}</option>
            {this.renderOptions(this.state.owners)}
          </select>
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

  renderOptions(objects) {
    if (objects) {
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
      errors: null,
      all_roles: nextProps.all_roles,
      owners: nextProps.owners
    });
  }

  handleChange(event) {
    let attribute = event.target.name;
    Object.assign(this.state.course, {[attribute]: event.target.value});
    this.setState({
      course: this.state.course
    });
  }

  handleChangeRole(event) {
    let role_url = routes.filter_role_url($('#list-roles').val());
    axios.get(role_url)
      .then(response => {
        this.setState({
          owners: response.data.owners
        });
      })
      .catch(error => {
          console.log(error);
        }
      );
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
    let course = _.omit(this.state.course, 'errors');
    let formData = new FormData();
    for (let key of Object.keys(course)) {
      formData.append('course[' + key + ']', course[key]);
    }
    if (this.state.changeImage) {
      formData.append('course[image]', this.state.image);
    }
    if (Object.keys(course).length == 0) {
      formData.append('course[key]', null);
    }
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    axios.post(this.props.url,
      formData
    , app_constants.AXIOS_CONFIG)
    .then(response => {
      $('.modalEdit').modal('hide');
      this.setState({
        program_detail: {},
        image: '',
        course: {},
        changeImage: false,
      });
      window.location.href = app_constants.APP_NAME +
        app_constants.COURSES_PATH + '/' + response.data.course.id;
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }
}
