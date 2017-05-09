import EvaluationStandardsTab from './evaluation_standards_tab';
import Header from '../header';
import React from 'react';
import TrainingResultsTab from './training_results_tab';
import * as react_table_ultis from 'shared/react-table/ultis';

export default class EvaluationTemplateTab extends React.Component {
  constructor(props) {
    super(props);

    let evaluation_template = props.evaluation_template || {};

    let evaluation_standards = [];
    if (evaluation_template.evaluation_standards) {
      for (let standard of evaluation_template.evaluation_standards) {
        evaluation_standards.push(standard);
      }
    }

    let training_results = [];
    if (evaluation_template.training_results) {
      for (let result of evaluation_template.training_results) {
        training_results.push(result);
      }
    }

    this.state = {
      id: evaluation_template.id,
      name: evaluation_template.name || '',
      evaluation_standards: evaluation_standards,
      training_results: training_results,
      errors: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    let evaluation_template = nextProps.evaluation_template || {};

    let evaluation_standards = [];
    if (evaluation_template.evaluation_standards) {
      for (let standard of evaluation_template.evaluation_standards) {
        evaluation_standards.push(standard);
      }
    }

    let training_results = [];
    if (evaluation_template.training_results) {
      for (let result of evaluation_template.training_results) {
        training_results.push(result);
      }
    }

    this.setState({
      id: evaluation_template.id,
      name: evaluation_template.name || '',
      evaluation_standards: evaluation_standards,
      training_results: training_results,
      errors: null,
    });
  }

  render() {
    return (
      <div className='tab-pane clearfix' id='evaluation_template'>
        <div className='row'>
          <div className='form-group'>
            <label>
              {I18n.t('evaluation_templates.headers.name')}
            </label>
            <span className='form-control'>
              {this.state.name}
            </span>
          </div>
          <ul className='nav nav-tabs'>
            <li className='active'>
              <a data-toggle='tab' href='.panel_evaluation_standards'
                className='tab'>
                {I18n.t('training_standards.evaluation_standards')}
              </a>
            </li>
            <li>
              <a data-toggle='tab' href='.panel_training_results'
                className='tab'>
                {I18n.t('training_standards.training_results')}
              </a>
            </li>
          </ul>
          <div className='tab-content'>
            <div className='panel_evaluation_standards
              tab-pane fade in active'>
              <EvaluationStandardsTab
                evaluation_standards={this.props.evaluation_template.evaluation_standards}/>
            </div>
            <div className='panel_training_results tab-pane fade'>
              <TrainingResultsTab
                training_results={this.props.evaluation_template.training_results}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
