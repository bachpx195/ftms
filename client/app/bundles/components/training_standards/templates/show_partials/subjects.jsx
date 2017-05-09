import css from 'assets/sass/react-table.scss';
import React from 'react';
import ReactTable from 'react-table';
import * as react_table_ultis from 'shared/react-table/ultis';
import * as routes from 'config/routes';

export default class Subjects extends React.Component {
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
        header: I18n.t('subjects.headers.name'),
        accessor: 'name',
        render: row => {
          return <a title={row.value}
            href={routes.subject_url(row.row.id)}>{row.value}</a>
        },
      },
      {
        header: I18n.t('subjects.headers.description'),
        accessor: 'description',
        render: row => <span title={row.value}>{row.value}</span>,
        minWidth: 400
      }
    ]

    return (
      <div className='tab-pane clearfix' id='assigned_subject'>
        <div className='row'>
          <ReactTable
            className='-striped -highlight' data={this.props.selected_subjects}
            columns={columns} defaultPageSize={react_table_ultis.defaultPageSize}
            showFilters={true}
            defaultFilterMethod={react_table_ultis.defaultFilter}
          />
        </div>
      </div>
    );
  }
}
