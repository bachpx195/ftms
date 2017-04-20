import * as app_constants from 'constants/app_constants';
import * as organization_constants from '../../../organizations/constants/organization_constants';
import AwayBlock from './away_block';
import ManagerBlock from './manager_block';
import React from 'react';
import UserBlock from './user';

const ORGANIZATION_URL = app_constants.APP_NAME +
  organization_constants.ORGANIZATION_PATH

export default class OrganizationBlock extends React.Component {
  render() {
    return (
      <div className='organization-block'>
        <div className='organization-name'>
          <a href={`${ORGANIZATION_URL}${this.props.data.id}`}
            title={this.props.data.name}>
            {this.props.data.name}
          </a>
        </div>

        <div className='manager-structure'>
          <UserBlock user={this.props.data.owner}
            title={I18n.t('organization_charts.positions.manager')} />
        </div>
        <div className='structure-content'>
          <AwayBlock trainees={this.props.data.away_trainees} />
        </div>
        <ManagerBlock trainers={this.props.data.data} />
      </div>
    );
  }
}
