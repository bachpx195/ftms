import * as routes from 'config/routes';
import axios from 'axios';
import Destroy from './actions/destroy';
import Form from './templates/form';
import Modal from '../requirements/templates/modal';
import React from 'react';
import ReactOnRails from 'react-on-rails';
import RenderTextButton from './templates/render_text_button';
import Requirements from '../requirements/requirements';
import RequirementPolicy from 'policy/requirement_policy';

export default class ProjectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requirements: props.requirements,
      requirement: {},
      project: props.project,
      organization: props.organization,
      url: null,
      showForm: false
    }
  }

  render() {
    let form = null;
    let project_url = routes.subject_project_url(
      this.state.project.course_subject.subject_id, this.state.project.id);
    if (this.state.showForm) {
      form = <Form project={this.state.project} url={project_url}
        organization={this.state.organization}
        handleAfterUpdate={this.handleAfterUpdate.bind(this)} />;
    }
    let requirements_url = routes.project_requirements_url(this.state.project.id);
    if (this.state.requirement.id != undefined) {
      requirements_url = this.state.url;
    }

    let action_destroy = '';
    action_destroy = <Destroy project={this.state.project} url={project_url}/>

    return(
      <div className='row evaluation_templates' id='admin-evaluation_templates'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>
                {I18n.t('evaluation_templates.title')} :
                {this.state.project.name}
              </h3>
              <div className='box-tools pull-right'>
                <button type='button' className='btn btn-info'
                  onClick={this.handleClickButton.bind(this)}>
                  <RenderTextButton showForm={this.state.showForm} />
                </button>&nbsp;
                {action_destroy}
              </div>
            </div>
            <div className='box-body'>
              {form}
              <div className='clearfix'></div>
              <div className='add-requirement col-md-3'>
                <RequirementPolicy permit={[
                  {action: ['ownerById'], data: {ids: this.state.organization.user_id}},
                  {action: ['ownerByIds'], data: {ids: this.props.ids_of_course_manager}},
                  {action: ['create', 'memberOfTeam'], data: {
                    teams_of_project: this.state.project.teams_of_project,
                    teams_of_current_user: this.state.project.teams_of_current_user}}
                ]}>
                  <button type='button' className='btn btn-primary'
                    onClick={this.handleAddRequirement.bind(this)}>
                    <i className='fa fa-plus'></i>
                    &nbsp;{I18n.t('projects.add_requirement')}</button>
                </RequirementPolicy>
                <div className='clearfix'></div>
              </div>
            </div>
              <Requirements 
                ids_of_course_manager={this.props.ids_of_course_manager}
                project={this.state.project}
                organization={this.state.organization}
                requirements={this.state.requirements}
                requirement={this.state.requirement}
                handleOnClickEdit={this.handleOnClickEdit.bind(this)} />
          </div>
        </div>
        <Modal requirement={this.state.requirement} url={requirements_url}
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
