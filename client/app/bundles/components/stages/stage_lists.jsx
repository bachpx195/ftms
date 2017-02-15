import _ from "lodash";
import React from 'react';
import StageItem from './stage_item';

export default class StageLists extends React.Component {
  renderItems() {
    const props = _.omit(this.props, 'stages');

    return _.map(this.props.stages, stage => {
      return <StageItem key={stage.id} stage={stage} {...props} />
    });
  }

  render() {
    return (
      <table className='table table-border'>
        <thead>
          <tr>
            <th>{I18n.t('stages.headers.name')}</th>
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
