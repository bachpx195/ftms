import _ from "lodash";
import React from 'react';
import OrganizationItem from './organization_item';

export default class OrganizationLists extends React.Component {
  renderItems() {
    const props = _.omit(this.props, 'organizations')

    return _.map(this.props.organizations, organization => <OrganizationItem key={organization.id}
      organizations={this.props.organizations} organization={organization} {...props} />)
  }

  render () {
    return (
      <table className='table table-border'>
        <thead>
          <tr>
            <th>{I18n.t('organizations.headers.name')}</th>
            <th>{I18n.t('organizations.parent_name')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.renderItems()}
        </tbody>
      </table>
    );
  }
}
