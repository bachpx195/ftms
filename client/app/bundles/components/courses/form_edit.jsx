import axios from 'axios';
import Dropzone from 'react-dropzone';
import Errors from '../shareds/errors';
import React from 'react';
import ReactOnRails from 'react-on-rails';
import _ from 'lodash';

require('../../assets/sass/program_show.scss');

export default class FormEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      course: props.course,
      image:  props.course.image,
      changeImage: false,
      errors: null,
    }
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
      <div className='modalEdit modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content form-edit-show-course'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>
                {I18n.t('courses.modals.header_edit')}
              </h4>
            </div>
            <div className='modal-body'>
              <form onSubmit={this.handleSubmit.bind(this)}
                encType="multipart/form-data">
                <Errors errors={this.state.errors} />
                <div className='form-group'>
                  <div className='dropzone'>
                    <div className='form-group'>
                      <button type='button'
                        className='btn btn-danger btn-select-file'
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
                <div className="form-group">
                  <select disabled className="form-control" name="language_id"
                    value={this.state.course.language_id}
                    onChange={this.handleChange.bind(this)}>
                    {this.renderOptions(this.state.course.languages,
                      this.state.course.language_id)}
                  </select>
                </div>
                <div className="form-group">
                  <select className="form-control" name="training_standard_id"
                    value={this.state.course.training_standard_id}
                    onChange={this.handleChange.bind(this)} disabled>
                    {this.renderOptions(this.state.course.training_standards,
                      this.state.course.training_standard_id)}
                  </select>
                </div>
                <div className='form-group'>
                  <input type='text' placeholder={I18n.t('courses.headers.name')}
                    value={this.state.course.name || ''}
                    onChange={this.handleChange.bind(this)}
                    className='form-control' name='name' />
                </div>
                <div className='form-group'>
                  <textarea placeholder={I18n.t('courses.headers.description')}
                    value={this.state.course.description || ''}
                    onChange={this.handleChange.bind(this)}
                    className='form-control' name='description'></textarea>
                </div>
                <div className='col-sm-6 course-start-date'>
                  <label>{I18n.t('courses.start_date')}</label>
                  <input type='date' onChange={this.handleChange.bind(this)}
                    value={this.state.course.start_date || ''}
                    name='start_date' className='form-control'/>
                </div>
                <div className='col-sm-6 course-end-date'>
                  <label>{I18n.t('courses.end_date')}</label>
                  <input type='date' onChange={this.handleChange.bind(this)}
                    value={this.state.course.end_date || ''}
                    name='end_date' className='form-control' />
                </div>
                <div className='form-group'>
                  <div className='text-right'>
                    <button type='submit' className='btn btn-primary'>
                      {I18n.t('buttons.save')}</button>
                  </div>
                </div>
              </form>
           </div>
          </div>
        </div>
      </div>
    );
  }

  renderOptions(_objects, id) {
    let objs = _objects.filter(object => {
      return object.id.toString().toLowerCase().includes(
        id.toString().toLowerCase());
    });
    if (objs.length == 1) {
      return <option key={objs[0].id}
        value={objs[0].id}>{objs[0].name}</option>;
    }
    return null;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      course: nextProps.course,
      image: nextProps.course.image,
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
    for (let obj of form_data) {
      formData.append('course[' + obj.name + ']', obj.value);
    }
    let course = _.omit(this.state, 'errors');
    if (this.state.changeImage) {
      formData.append('course[image]', course.image);
    }
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    axios({
      url: this.props.url,
      method: 'PUT',
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      $('.modalEdit').modal('hide');
      this.setState({
        program_detail: {},
        image: '',
        errors: null,
        changeImage: false,
      });
      this.props.handleAfterUpdate(response.data.course)
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }
}
