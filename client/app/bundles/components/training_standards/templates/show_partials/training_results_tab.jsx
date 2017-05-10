import React from 'react';
import TrainingResultItemShow from './training_result_item_show';

export default class TrainingResultsTab extends React.Component {
  render() {
    return (
      <div className='panel panel-info'>
        <div className='panel-body list-evaluation-standards'>
          <table className='table table-hover table-striped table-responsive'>
            <thead>
              <tr>
                <th><span>#</span></th>
                <th>{I18n.t('training_results.headers.name')}</th>
                <th>{I18n.t('training_results.headers.min_point')}</th>
                <th>{I18n.t('training_results.headers.max_point')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody className='body-evaluation-standards'>
              {this.renderTrainingResults()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderTrainingResults() {
    return this.props.training_results.map((training_result, index) => {
      if (!training_result._destroy) {
        return (
          <TrainingResultItemShow training_result={training_result}
            key={index} index={index}/>
        );
      }
      return null;
    });
  }
}
