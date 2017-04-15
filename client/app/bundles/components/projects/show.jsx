import React from 'react';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';
import Form from './templates/form';
import Modal from '../requirements/templates/modal';
import RequirementLists from '../requirements/requirements';
import RenderTextButton from './templates/render_text_button';
import * as app_constants from 'constants/app_constants';
import * as project_constants from './constants/project_constants';
import * as subject_constants from '../subjects/subject_constants';

const SUBJECT_URL = app_constants.APP_NAME + subject_constants.SUBJECT_PATH;

export default class ProjectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requirements: {},
      requirement: {},
      project: props.project,
      url: null,
      showForm: false
    }
  }

  render() {
    let form = null;
    let url = SUBJECT_URL + this.state.project.course_subject.subject_id
      + '/'+ 'projects' + '/' + this.state.project.id;
    if (this.state.showForm) {
      form = <Form project={this.state.project} url={url}
        organizations={this.state.organizations}
        handleAfterUpdate={this.handleAfterUpdate.bind(this)} />;
    }

    let path = url + project_constants.REQUIREMENT_PATH;
    if (this.state.requirement.id != undefined) {
      path = this.state.url;
    }

    return(
      <div className='row evaluation_templates' id='admin-evaluation_templates'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>
                {I18n.t('evaluation_templates.title')} :
                {this.state.project.name}
              </h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-info"
                  onClick={this.handleClickButton.bind(this)}>
                  <RenderTextButton showForm={this.state.showForm} />
                </button>&nbsp;
                <button className="btn btn-danger"
                  onClick={this.handleDelete.bind(this)}>
                  {I18n.t('buttons.delete')}</button>
              </div>
            </div>
            <div className='box-body'>
              {form}
              <div className="clearfix"></div>
              <div className='add-requirement col-md-3'>
                <button type='button' className='btn btn-primary'
                  onClick={this.handleAddRequirement.bind(this)}>
                  {I18n.t('projects.add_requirement')}</button>
                <div className="clearfix"></div>
              </div>
            </div>
              <RequirementLists requirements={this.state.requirements}
                requirement={this.state.requirement}
                handleOnClickEdit={this.handleOnClickEdit.bind(this)} />
          </div>
        </div>
        <Modal requirement={this.state.requirement} url={path}
          requirements={this.state.requirements}
          handleAfterCreate={this.handleAfterCreate.bind(this)}
           />
      </div>
    );
  }

  handleAddRequirement(event) {
    $('#modalRequirement').modal();
    this.setState({requirement: {}});
  }

  handleOnClickEdit(requirement, url) {
    $('#modalRequirement').modal();
    this.setState({requirement: requirement, url: url});
  }

  handleClickButton() {
    let show = this.state.showForm ? false : true;
    this.setState({showForm: show});
  }

  handleAfterCreate(new_requirements) {
    this.setState({requirements: new_requirements});
  }

  handleAfterUpdate(new_project) {
    this.setState({
      project: new_project,
      showForm: false
    });
  }

  handleDelete() {
    if (confirm(I18n.t('data.confirm_delete'))) {
      const url = PROJECTS_URL + '/' + this.state.project.id;
      axios.delete(url, {
        params: {authenticity_token: ReactOnRails.authenticityToken()},
        headers: {'Accept': 'application/json'}
      })
      .then(response => {window.location.href = PROJECTS_URL;})
      .catch(error => console.log(error));
    }
  }
}
