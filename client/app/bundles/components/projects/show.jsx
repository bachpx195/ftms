import React from 'react';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';
import Form from './templates/form';
import Modal from '../requirements/templates/modal';
import Requirements from '../requirements/requirements';
import RenderTextButton from './templates/render_text_button';
import Destroy from './actions/destroy';
import * as app_constants from 'constants/app_constants';

const SUBJECTS_URL = app_constants.APP_NAME + app_constants.SUBJECTS_PATH;
const PROJECTS_URL = app_constants.APP_NAME + app_constants.PROJECTS_PATH;

export default class ProjectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requirements: props.requirements,
      requirement: {},
      project: props.project,
      organizations: props.organizations,
      url: null,
      showForm: false
    }
  }

  render() {
    let form = null;
    let url = SUBJECTS_URL + '/' + this.state.project.course_subject.subject_id
      + '/'+ 'projects' + '/' + this.state.project.id;
    if (this.state.showForm) {
      form = <Form project={this.state.project} url={url}
        organizations={this.state.organizations}
        handleAfterUpdate={this.handleAfterUpdate.bind(this)} />;
    }
    let path = PROJECTS_URL + '/' + this.state.project.id + '/' +
      app_constants.REQUIREMENTS_PATH;
    if (this.state.requirement.id != undefined) {
      path = this.state.url;
    }

    let action_destroy = '';
    action_destroy = <Destroy project={this.state.project} url={url}/>

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
                {action_destroy}
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
              <Requirements requirements={this.state.requirements}
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
}
