import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import OrganizationPolicy from 'policy/organization_policy';
import React from 'react';
import Row from '../griddle/row';
import * as routes from 'config/routes';
import * as table_constants from 'constants/griddle_table_constants';

export default class ManagerOrganizations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: null,
      organizations: props.organizations,
       organization: {
         name: ''
       }

    };
    Row.prototype.organizations = this.state.organizations;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      organizations: nextProps.organizations
    });
  }

  render() {
    Row.prototype.organizations = this.props.organizations;
    const NewLayout = ({Table, Pagination, Filter}) => (
      <div className='row'>
        <div className='griddle-head clearfix'>
          <div className='col-md-6'>
            <Filter />
          </div>
          <div className='col-md-6 text-right'>
            <Pagination />
          </div>
        </div>
        <Table />
      </div>
    );
    const LinkShowOrganization = ({value, griddleKey}) => {
      return (<a href={routes.organization_url(
        this.state.organizations[griddleKey].id)}>{value}</a>);
    }
    return (
      <div className='col-md-12'>
        <Griddle data={this.state.organizations}
          plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout, Row: Row}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id='name' title={I18n.t('organizations.name')}
              customComponent={LinkShowOrganization} />
          </RowDefinition>
        </Griddle>
      </div>
    );
  }
}
