import _ from 'lodash';
import React from 'react';
import TrainingStandardItem from './training_standard_item';

export default class TrainingStandardList extends React.Component {
  render() {
    return (
      <table className='table table-border'>
        <thead>
          <tr>
            <th>{I18n.t('training_standard.headers.name')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.renderItem()}
        </tbody>
      </table>
    );
  }

  renderItem() {
    const props = _.omit(this.props, 'training_standards');
    return _.map(this.props.training_standards, training_standard => {
      return <TrainingStandardItem key={training_standard.id}
        training_standard={training_standard} {...props} />});
  }
}
