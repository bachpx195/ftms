import React from 'react';
import ReactOnRails from 'react-on-rails';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Errors from 'shared/errors';
import RenderOptions from './render_options'
import _ from 'lodash';
import * as app_constants from 'constants/app_constants'

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: {
        name: '',
        description: '',
      },
      organization: props.organization,
      errors: null,
    };
  }

  render() {
    return (
      <div className='col-md-8 col-md-offset-2'>
        <form onSubmit={this.handleSubmit.bind(this)}
          className='form-horizontal'>
          <Errors errors={this.state.errors} />
          <div className='form-group'>
            <div className='col-md-12'>
              <input type='text' placeholder={I18n.t('projects.headers.name')}
                className='form-control' name='name' ref='nameField'
                onChange={this.handleChange.bind(this)} />
            </div>
          </div>

          <div className='form-group'>
            <div className='col-md-12'>
              <input type='text' placeholder={I18n.t('projects.headers.description')}
                className='form-control' name='description' ref='contentField'
                onChange={this.handleChange.bind(this)} />
            </div>
          </div>

          <div className='form-group'>
            <div className='col-md-12 text-center'>
              <button type='submit' className='btn btn-primary'
                disabled={!this.formValid()}
                onClick={this.handleSubmit.bind(this)}>
                {I18n.t('buttons.create_task')}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  handleChange(event) {
    let attribute = event.target.name;
    Object.assign(this.state.task, {[attribute]: event.target.value})
    this.setState({
      task: this.state.task
    });
  }

  formValid() {
    return this.state.task.name != '';
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(this.props.url, {
      targetable: {
        name: this.state.task.name,
        description: this.state.task.description,
        course_subject_id: this.props.course_subject_id
      }, authenticity_token: ReactOnRails.authenticityToken(),
        ownerable_id: this.props.ownerable_id,
        ownerable_type: this.props.ownerable_type,
        type: this.props.type
    }, app_constants.AXIOS_CONFIG)
      .then(response => {
        this.refs.nameField.value = '';
        this.refs.contentField.value = '';
        this.props.handleAfterCreatedProject(response.data.target,
          this.props.type);
      })
      .catch(error => console.log(error));
  }
}
