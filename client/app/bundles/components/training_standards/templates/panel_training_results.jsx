import TrainingResultItem from './training_result_item';
import React from 'react';

export default class PanelTrainingResults extends React.Component {
  render() {
    return (
      <div className='panel panel-info'>
        <div className='panel-body list-evaluation-standards'>
          <div className='evaluation-item-container evaluation-item-container'>
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
        <div className='panel-footer'>
          <a className='new-item' onClick={this.props.addTrainingResult}
            title={I18n.t('training_standards.new_training_result')}>
            <i className='fa fa-plus'></i> &nbsp;
            {I18n.t('training_standards.new_training_result')}
          </a>
        </div>
      </div>
    );
  }

  renderTrainingResults() {
    return this.props.training_results.map((training_result, index) => {
      if (!training_result._destroy) {
        return (
          <TrainingResultItem training_result={training_result}
            key={index} index={index}
            changeTrainingResult={this.props.changeTrainingResult}
            removeTrainingResult={this.props.removeTrainingResult}
          />
        );
      }
      return null;
    });
  }
}
