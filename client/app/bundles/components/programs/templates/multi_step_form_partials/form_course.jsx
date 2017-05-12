import _ from 'lodash';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import Errors from '../../../shareds/errors';
import React from 'react';
import ReactOnRails from 'react-on-rails';
import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';

require('../../../../assets/sass/program_show.scss');

export default class FormCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      program_detail: props.program_detail,
      course: props.course,
      image: {},
      changeImage: false,
      errors: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      program_detail: nextProps.program_detail,
      changeImage: false,
      errors: {},
      all_roles: nextProps.all_roles,
      owners: nextProps.owners,
      course: nextProps.course
    });
  }

  render() {
    let image = '';
    if (this.state.course.image) {
      if (this.state.course.image.url) {
        image = <img src={this.state.image.url} />;
      } else if (this.state.course.image.preview) {
        image = <img src={this.state.course.image.preview} />;
      }
    }

    return (
      <fieldset>
        <Errors errors={this.state.errors} />
        <div className='form-group'>
          <div className='dropzone'>
            <div className='form-group'>
              <button type='button' className='btn btn-danger btn-select-file'
                onClick={this.onOpenClick.bind(this)}>
                <i className='fa fa-upload'></i>
                &nbsp;{I18n.t('courses.select_image')}
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
          <select className='form-control select' name='language_id'
            onChange={this.handleChange.bind(this)}
            value={this.state.course.language_id || ''}
            >
            <option value=''>{I18n.t('courses.select_languages')}</option>
            {this.renderOptions(this.state.program_detail.languages)}
          </select>
        </div>
        <div className='form-group'>
          <input type='text' placeholder={I18n.t('courses.headers.name')}
            onChange={this.handleChange.bind(this)}
            className='form-control' name='name'
            value={this.state.course.name}
            />
        </div>
        <div className='form-group'>
          <input type='text' placeholder={I18n.t('courses.headers.description')}
            onChange={this.handleChange.bind(this)}
            className='form-control' name='description'
            value={this.state.course.description}/>
        </div>
        <div className='form-group'>
          <input type='hidden' onChange={this.handleChange.bind(this)}
            value={this.props.program.id} name='program_id' />
        </div>
        <div className='text-center col-md-12'>
          <input type='button' name='cancel' className='cancel action-button'
            value={I18n.t('programs.button.cancel')}
            onClick={this.props.onCancelForm}/>
          <input type='button' name='next' className='next action-button'
            value={I18n.t('programs.button.next')}
            onClick={this.handleClickNext.bind(this)}/>
        </div>
      </fieldset>
    );
  }

  handleClickNext(event) {
    let current_errors = [];
    if (this.state.course.name == '') {
      current_errors['name'] = [I18n.t('courses.errors.blank_name')];
    }
    if (this.state.course.language_id == '') {
      current_errors['language'] = [I18n.t('courses.errors.must_be_selected')];
    }

    if (Object.keys(current_errors).length > 0) {
      this.setState({
        errors: current_errors,
      });
    } else {
      this.props.onClickNext(event);
    }
  }

  renderOptions(objects) {
    if (objects) {
      return objects.map(object => {
        return <option key={object.id} value={object.id}>
            {object.name}
          </option>;
      });
    }
    return null;
  }

  onClickOption(event) {
    this.setState({
      languages_id: event.target.value
    })
  }

  handleChange(event) {
    let attribute = event.target.name;
    Object.assign(this.state.course, {[attribute]: event.target.value});
    this.setState({
      course: this.state.course
    });
    this.props.afterInputFormCourse(this.state.course, this.state.image)
  }

  onDrop(acceptedFiles, rejectedFiles) {
    this.setState({
      image: acceptedFiles[0],
      changeImage: true
    });
    this.props.afterInputFormCourse(this.state.course, acceptedFiles[0])
  }

  onOpenClick() {
    this.refs.dropzoneField.open();
  }
}
