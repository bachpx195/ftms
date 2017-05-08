import * as react_table_ultis from 'shared/react-table/ultis';
import * as routes from 'config/routes';
import * as table_constants from 'constants/griddle_table_constants';
import css from 'assets/sass/react-table.scss';
import Form from './templates/form';
import React from 'react';
import ReactTable from 'react-table';

export default class Projects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: props.projects,
    }
  }

  render() {
    const columns = [
      {
        header: '#',
        accessor: 'position',
        render: row => <div className='text-right'>{row.index + 1}</div>,
        hideFilter: true,
        width: 50
      },
      {
        header: I18n.t('projects.headers.name'),
        accessor: 'name',
        render: row => {
          let project = this.state.projects[row.value];
          let project_url = '#';
          if (project) {
            project_url = routes.project_url(project.id);
          }
          return <a href={routes.project_url(row.row.id)}>{row.value}</a>;
        }
      },
      {
        header: I18n.t('projects.organization'),
        accessor: 'organization',
        render: row => {
          let project = this.state.projects[row.index];
          let name = '';
          if (project.organization) {
            name = project.organization.name;
          }
          return <span>{name}</span>;
        }
      },
      {
        header: I18n.t('projects.headers.description'),
        accessor: 'description',
      },
    ]

    return (
      <div>
        <ReactTable
          className='-striped -highlight' data={this.state.projects}
          columns={columns} showFilters={true}
          defaultPageSize={react_table_ultis.defaultPageSize}
          defaultFilterMethod={react_table_ultis.defaultFilter}
        />
      </div>
    );
  }
}
