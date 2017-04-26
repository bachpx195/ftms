import React from 'react';
import ReactOnRails from 'react-on-rails';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Errors from '../../shareds/errors';
import RenderOptions from './render_options'
import _ from 'lodash';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      project: props.project || {},
      organizations: props.organizations,
      errors: null,
    };
  }

  render() {
    return (
      <div className='col-md-8 col-md-offset-2'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Errors errors={this.state.errors} />
          <RenderOptions organizations={this.state.organizations}
            project={this.state.project}
            handleChange={this.handleChange.bind(this)}
            />
          <div className='form-group'>
            <input type='text' placeholder={I18n.t('projects.headers.name')}
              value={this.state.project.name || ''}
              onChange={this.handleChange.bind(this)}
              className='form-control' name='name' />
          </div>
          <div className='form-group'>
            <input type='text' onChange={this.handleChange.bind(this)}
              placeholder={I18n.t('projects.headers.description')}
              value={this.state.project.description || ''}
              className='form-control' name='description' />
          </div>
          <div className='form-group'>
            <div className='text-right'>
              <button type='submit' className='btn btn-primary'
                disabled={!this.formValid()}>{I18n.t('buttons.save')}</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      project: nextProps.project,
      organizations: nextProps.organizations,
      errors: null,
    });
  }

  handleChange(event) {
    let attribute = event.target.name;
    Object.assign(this.state.project, {[attribute]: event.target.value});
    this.setState({
      project: this.state.project
    });
  }

  formValid() {
    return this.state.project.organization_id != undefined &&
      this.state.project.name != undefined;
  }

  handleSubmit(event) {
    event.preventDefault();
    let project = _.omit(this.state.project, 'errors');
    let formData = new FormData();
    formData.append('project[name]', this.state.project.name);
    formData.append('project[description]', this.state.project.description);
    formData.append('project[organization_id]', this.state.project.organization_id);
    formData.append('project[ownerable_id]', this.props.team.id);
    formData.append('project[ownerable_type]', 'Team');
    formData.append('project[course_subject_id]', this.props.team.course_subject_id);
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    let method = this.state.project.id ? 'PUT' : 'POST';
    axios({
      url: this.props.url + '.json',
      method: method,
      data: formData,
    })
    .then(response => {
      $('.modal-create').modal('hide');
      this.props.handleAfterActionProject(response.data.project, 'projects');
      this.setState({
        project: {},
        errors: null,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
}
