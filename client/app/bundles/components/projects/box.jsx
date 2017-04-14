import React from 'react';
import axios from 'axios';
import Projects from './projects';
import * as app_constants from 'constants/app_constants';

export default class ProjectsBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: props.projects,
    };
  }

  render() {
    return (
      <div className='row projects admin-projects'>
        <div className='col-md-12'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <h3 className='box-title'>{I18n.t('projects.titles.all')}</h3>
              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool"
                  data-widget="collapse">
                  <i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool"
                  data-widget="remove">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>
            <div className='box-footer'>
              <Projects projects={this.state.projects} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
