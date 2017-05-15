import * as react_table_ultis from 'shared/react-table/ultis';
import * as routes from 'config/routes';
import css from 'assets/sass/react-table.scss';
import React from 'react';
import ReactTable from 'react-table';

export default class ManagerOrganizations extends React.Component {
  constructor(props) {
    super(props);
    var organizations = this.convertDataOrganizations(props.organizations);
    this.state = {
      parent: null,
      organizations: organizations,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      organizations: nextProps.organizations
    });
  }

  convertDataOrganizations(organizations) {
    var result = [];
    if ($.isArray(organizations))
      result = organizations
    else {
      var temp = [];
      temp.push(organizations);
      result = temp;
    }
    return result;
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
        header: I18n.t('organizations.name'),
        accessor: 'name',
        render: row => {
          return <a href={routes.organization_url(row.row.id)}>{row.value}</a>;
        }
      }
    ];

    return (
      <ReactTable
        className='-striped -highlight' data={this.state.organizations}
        columns={columns} showFilters={true}
        defaultPageSize={react_table_ultis.defaultPageSize}
        defaultFilterMethod={react_table_ultis.defaultFilter}
      />
    );
  }
}
