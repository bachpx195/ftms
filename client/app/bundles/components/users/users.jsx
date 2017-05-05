import * as react_table_ultis from 'shared/react-table/ultis';
import * as routes from 'config/routes';
import css from 'assets/sass/react-table.scss';
import React from 'react';
import ReactTable from 'react-table';

export default class Users extends React.Component {
  render(){
    const columns = [
      {
        header: '#',
        accessor: 'position',
        render: row => <div className='text-right'>{row.index + 1}</div>,
        hideFilter: true,
        width: 50
      },
      {
        header: I18n.t('users.name'),
        accessor: 'name',
        render: ({row}) => {
          let user_url = routes.user_url(row.id);
          return <a href={user_url}>{row.name}</a>
        }
      },
      {
        header: I18n.t('users.email'),
        accessor: 'email'
      }
    ];

    return(
      <div>
        <ReactTable className='-striped -highlight' data={this.props.users}
          columns={columns} defaultPageSize={react_table_ultis.defaultPageSize}
          showFilters={true}
          defaultFilterMethod={react_table_ultis.defaultFilter}
        />
      </div>
    );
  }
}
