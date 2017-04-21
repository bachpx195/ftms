import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import { NewLayout } from '../shareds/griddles/new_layout';
import Form from './templates/form';
import * as table_constants from 'constants/griddle_table_constants';
import * as routes from 'config/routes';

export default class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: props.projects,
    }
  }

  render() {
    {NewLayout}

    const LinkToProject = ({value, griddleKey}) => {
      let project = this.state.projects[griddleKey];
      let project_url = '#';
      if (project) {
        project_url = routes.subject_project_url(project.course_subject.subject_id,
          project.id);
      }
      return <a href={project_url}>{value}</a>;
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
