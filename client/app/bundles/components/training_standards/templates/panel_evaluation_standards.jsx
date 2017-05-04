import EvaluationStandardItem from './evaluation_standard_item';
import React from 'react';

export default class PanelEvaluationStandards extends React.Component {
  render() {
    return (
      <div className='panel panel-info'>
        <div className='panel-body list-evaluation-standards'>
          <div className='evaluation-item-container'>
            <table className='table table-hover table-striped table-responsive'>
              <thead>
                <tr>
                  <th><span>#</span></th>
                  <th>{I18n.t('evaluation_standards.headers.name')}</th>
                  <th>{I18n.t('evaluation_standards.headers.min_point')}</th>
                  <th>{I18n.t('evaluation_standards.headers.max_point')}</th>
                  <th>{I18n.t('evaluation_standards.headers.obligatory')}</th>
                </tr>
              </thead>
              <tbody className='body-evaluation-standards'>
                {this.renderEvaluationStandards()}
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td className='text-right'>
                    {I18n.t('evaluation_templates.sum_point')}
                  </td>
                  <td>
                    <input type='text' disabled className='form-control'
                      value={this.sum_point('min_point')} />
                  </td>
                  <td>
                    <input type='text' disabled className='form-control'
                      value={this.sum_point('max_point')} />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className='panel-footer'>
          <a className='new-item' onClick={this.props.addEvaluationStandard}
            title={I18n.t('training_standards.new_evaluation_standard')}>
            <i className='fa fa-plus'></i> &nbsp;
            {I18n.t('training_standards.new_evaluation_standard')}
          </a>
        </div>
      </div>
    );
  }

  renderEvaluationStandards() {
    return this.props.evaluation_standards.map((evaluation_standard, index) => {
      if (!evaluation_standard._destroy) {
        return (
          <EvaluationStandardItem evaluation_standard={evaluation_standard}
            key={index} index={index}
            changeEvaluationStandard={this.props.changeEvaluationStandard}
            removeEvaluationStandard={this.props.removeEvaluationStandard}
          />
        );
      }
      return null;
    });
  }

  sum_point(point) {
    let sum = 0;
    for (let evaluation_standard of this.props.evaluation_standards) {
      sum += parseInt(evaluation_standard[point]) || 0;
    }
    return sum;
  }
}
