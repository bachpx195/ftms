import * as react_table_ultis from 'shared/react-table/ultis';
import css from 'react-table/react-table.css';
import React from 'react';
import ReactTable from 'react-table';

export default class FunctionLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      functions: props.functions
    };
  }

  render() {
    const columns = [
      {
        header: I18n.t('functions.table_position'),
        accessor: 'id',
        filterMethod: (filter, row) => {
          return row.id.toString().toLowerCase()
            .includes(filter.value.toString().toLowerCase());},
        width: 70,
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
        <ReactTable className='-striped -highlight' data={this.state.functions}
          columns={columns} defaultPageSize={react_table_ultis.defaultPageSize}
          showFilters={true}
          defaultFilterMethod={react_table_ultis.defaultFilter}
        />
      </div>
    );
  }
}
