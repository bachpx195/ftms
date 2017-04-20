import * as app_constants from 'constants/app_constants';
import React from 'react';
import TraineeBlock from './trainee_block';

export default class ManagerBlock extends React.Component {
  render() {
    return (
      <div className='subject-structure'>
        <div className='subject-block'>
          <div className='away-trainee'>
            <img src={app_constants.DEFAULT_IMAGE_USER_URL}
              className='img-circle' width='40' height='40'
              alt={I18n.t('organization_charts.positions.away_trainees')} />
            &nbsp;&nbsp;
            <span className='title-name'>
              {I18n.t('organization_charts.positions.away_trainees')}
            </span>
          </div>
          <div className='trainee-structure nil-structure'>
          </div>
          <TraineeBlock trainees={this.props.trainees} />
        </div>
      </div>
    );
  }
}
