import * as react_table_ultis from 'shared/react-table/ultis';
import css from 'assets/sass/react-table.scss';
import React from 'react';
import ReactTable from 'react-table';

export default class FunctionLists extends React.Component {
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
        header: I18n.t('functions.controller_name'),
        accessor: 'controller_name',
      },
      {
        header: I18n.t('functions.action'),
        accessor: 'action',
        width: 200,
      },
    ];

    return (
      <div>
        <ReactTable className='-striped -highlight' data={this.props.functions}
          columns={columns} defaultPageSize={react_table_ultis.defaultPageSize}
          showFilters={true}
          defaultFilterMethod={react_table_ultis.defaultFilter}
        />
      </div>
    );
  }
}
