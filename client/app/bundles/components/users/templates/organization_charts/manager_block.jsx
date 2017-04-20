import React from 'react';
import SubjectBlock from './subject_block';
import UserBlock from './user';

export default class ManagerBlock extends React.Component {
  render() {
    return (
      <div className='structure-content'>
        {this.renderManagerBlock()}
      </div>
    );
  }

  renderManagerBlock() {
    return _.map(this.props.trainers, (trainer, index) => {
      return (
        <div key={index}>
          <div className='trainer-structure'>
            <UserBlock user={trainer.trainer}
              title={I18n.t('organization_charts.positions.trainer')} />
          </div>
          <SubjectBlock subjects={trainer.subjects} />
        </div>
      );
    });
  }
}
