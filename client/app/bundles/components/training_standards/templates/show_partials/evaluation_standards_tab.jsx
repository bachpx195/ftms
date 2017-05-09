import EvaluationStandardItemShow from './evaluation_standard_item_show';
import React from 'react';

export default class EvaluationStandardsTab extends React.Component {
  render() {
    return (
      <div className='panel panel-info'>
        <div className='panel-body list-evaluation-standards'>
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
    );
  }

  renderEvaluationStandards() {
    return this.props.evaluation_standards.map((evaluation_standard, index) => {
      if (!evaluation_standard._destroy) {
        return (
          <EvaluationStandardItemShow evaluation_standard={evaluation_standard}
            key={index} index={index}
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
