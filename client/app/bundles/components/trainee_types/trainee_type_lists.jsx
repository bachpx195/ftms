import _ from "lodash";
import React from 'react'
import TraineeTypeItem from './trainee_type_item';

export default class TraineeTypeLists extends React.Component {
  renderItems() {
    const props = _.omit(this.props, 'trainee_types');

    return _.map(this.props.trainee_types, trainee_type => {
      return <TraineeTypeItem key={trainee_type.id} trainee_type={trainee_type} {...props} />
    });
  }

  render() {
    return (
      <table className='table table-border'>
        <thead>
          <tr>
            <th>{I18n.t('trainee_type.headers.name')}</th>
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
