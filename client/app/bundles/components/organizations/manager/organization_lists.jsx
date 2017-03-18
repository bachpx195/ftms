import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import FormEdit from '../organization_form/form_edit';
import FormCreate from '../organization_form/form_create';
import * as table_constants from 'constants/griddle_table_constants';

import * as app_constants from 'constants/app_constants';
import * as organization_constants from '../organization_constants';

const ORGANIZATION_URL = app_constants.APP_NAME + organization_constants.ORGANIZATION_PATH;

export default class OrganizationLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: null,
      organizations: props.organizations,
      organization: {
        name: ''
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      organizations: nextProps.organizations
    });
  }

  render() {
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

    const LinkShowOrganization = ({value, griddleKey}) => (
      <a href={ORGANIZATION_URL + '/' + this.props.organizations[griddleKey].id}>{value}</a>
    );
    return (
      <div className='col-md-12'>
        <Griddle data={this.state.organizations}
          plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
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
