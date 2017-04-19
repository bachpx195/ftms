import css from '../../assets/organization_charts.scss';
import OrganizationBlock from './organization_block';
import React from 'react';

export default class OrganizationChartBox extends React.Component {
  render() {
    return (
      <div className='organization-chart'>
        <div className='user-structure'>
          <div className="structure-content">
            <OrganizationBlock data={this.props.data} />
          </div>
        </div>
      </div>
    );
  }
}
