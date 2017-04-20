import React from 'react';
import UserBlock from './user';

export default class TraineeBlock extends React.Component {
  render() {
    return (
      <div>
        {this.renderTrainees()}
      </div>
    );
  }

  renderTrainees() {
    return _.map(this.props.trainees, (trainee, index) => {
      return (
        <div key={index} className='trainee-structure'>
          <UserBlock user={trainee}
            title={I18n.t('organization_charts.positions.trainee')} />
        </div>
      );
    });
  }
}
