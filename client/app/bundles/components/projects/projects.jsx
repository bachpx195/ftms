import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import Form from './templates/form';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import * as project_constants from './constants/project_constants';
import * as subject_constants from '../subjects/subject_constants';

const SUBJECT_URL = app_constants.APP_NAME + subject_constants.SUBJECT_PATH;

export default class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: props.projects,
    }
  }

  render() {
    const NewLayout = ({Table, Pagination, Filter}) => (
      <div className='col-md-12'>
        <div className='row'>
          <div className='griddle-head clearfix'>
            <div className='col-md-6'>
              <Filter />
            </div>
            <div className='col-md-6 text-right'>
              <Pagination />
            </div>
          </div>
          <div className='col-md-12'>
            <Table />
          </div>
        </div>
      </div>
    );

    const LinkToProject = ({value, griddleKey}) => {
      let project = this.state.projects[griddleKey];
      let link = '#';
      if (project) {
        link = SUBJECT_URL + project.course_subject.subject_id 
          + '/'+ 'projects' + '/' + project.id;
      }
      return <a href={link}>{value}</a>;
    };

    const OrganizationName = ({value, griddleKey}) => {
      let project = this.state.projects[griddleKey];
      let name = '';
      if (project.organization) {
        name = project.organization.name;
      }
      return <span>{name}</span>;
    };

    return (
      <div>
        <Griddle data={this.state.projects} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id='name' title={I18n.t('projects.headers.name')}
              customComponent={LinkToProject} />
            <ColumnDefinition id='organization' 
              title={I18n.t('projects.organization')}
              customComponent={OrganizationName} />
            <ColumnDefinition id='description'
              title={I18n.t('projects.headers.description')} />
          </RowDefinition>
        </Griddle>
      </div>
    );
  }
}
