import * as react_table_ultis from 'shared/react-table/ultis';
import * as routes from 'config/routes';
import css from 'assets/sass/react-table.scss';
import React from 'react';
import ReactTable from 'react-table';

export default class MetaTasks extends React.Component {
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
        header: I18n.t('tasks.headers.title'),
        accessor: 'title',
        render: row => <a href={routes.user_url(row.row.id)}>{row.value}</a>
      },
      {
        header: I18n.t('tasks.headers.value'),
        accessor: 'value',
        render: row => <a href={row.value}>{row.value}</a>,
        minWidth: 300
      },
      {
        header: I18n.t('tasks.headers.sent_at'),
        id: 'sent_at',
        accessor: d => I18n.l('time.formats.default', d.value),
        style: {textAlign: 'right'},
        width: 250
      }
    ];

    return (
      <ReactTable
        className='-striped -highlight' data={this.props.meta_tasks}
        columns={columns} showFilters={true}
        defaultPageSize={react_table_ultis.defaultPageSize}
        defaultFilterMethod={react_table_ultis.defaultFilter}
      />
    );
  }
}
