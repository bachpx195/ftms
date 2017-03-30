import React from 'react';
import axios from 'axios';
import ReactOnRails from 'react-on-rails';
import Form from './form';
import * as app_constants from 'constants/app_constants';
import * as project_constants from './project_constants';

const PROJECTS_URL = app_constants.APP_NAME + project_constants.PROJECT_PATH;
require('../subjects/subject.scss');

export default class ProjectsShowBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: props.project,
      showForm: false
    }
  }

  componentDidMount() {
    axios.get(PROJECTS_URL + '/' + this.state.project.id + '.json')
    .then(response => {
      this.setState({
        project: response.data.project,
        organizations: response.data.organizations
      });
    }).catch(error => console.log(error));
  }

  render() {
    let form = null;
    if (this.state.showForm) {
      const url = PROJECTS_URL + '/' + this.state.project.id;
      form = <Form project={this.state.project} url={url}
        organizations={this.state.organizations}
        handleAfterUpdate={this.handleAfterUpdate.bind(this)} />;
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
                  {this.renderText()}</button>&nbsp;

                <button className="btn btn-danger"
                  onClick={this.handleDelete.bind(this)}>
                  {I18n.t('buttons.delete')}</button>
              </div>
            </div>
            <div className='box-body'>
              <div className='col-md-8 col-md-offset-2'>{form}</div>
            </div>
            <div className='add-requirement col-md-3'>
              <button type='button' className='btn btn-primary'>
                {I18n.t('projects.add_requirement')}</button>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderText() {
    if (this.state.showForm) {
      return (<div>{I18n.t('buttons.cancel')}</div>);
    } else {
      return (
        <div><i className="fa fa-pencil"></i>{I18n.t('buttons.edit')}</div>);
    }
  }

  handleClickButton() {
    let show = this.state.showForm ? false : true;
    this.setState({showForm: show});
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
