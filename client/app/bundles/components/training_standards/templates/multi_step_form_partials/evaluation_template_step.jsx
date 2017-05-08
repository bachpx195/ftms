import axios from 'axios';
import PanelEvaluationStandards from '../panel_evaluation_standards';
import PanelTrainingResults from '../panel_training_results';
import React from 'react';

export default class EvaluationTemplateStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluation_template: props.evaluation_template || {
        name: '', training_results: [], evaluation_standards: [],
      },
      errors: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      evaluation_template: this.state.evaluation_template,
      errors: null,
    });
  }

  render() {
    return (
      <fieldset>
        <div className='form-group'>
          <label>
            {I18n.t('evaluation_templates.headers.name')}
          </label>
          <input type='text' name='template_name' ref='nameField'
            onChange={this.handleChangeName.bind(this)}
            className='form-control'
            value={this.state.evaluation_template.name || ''}/>
        </div>
        <PanelEvaluationStandards
          evaluation_standards={this.state.evaluation_template.evaluation_standards}
          addEvaluationStandard={this.addEvaluationStandard.bind(this)}
          changeEvaluationStandard={this.changeEvaluationStandard.bind(this)}
          removeEvaluationStandard={this.removeEvaluationStandard.bind(this)} />
        <PanelTrainingResults
          training_results={this.state.evaluation_template.training_results}
          addTrainingResult={this.addTrainingResult.bind(this)}
          changeTrainingResult={this.changeTrainingResult.bind(this)}
          removeTrainingResult={this.removeTrainingResult.bind(this)} />

        <div className='text-center col-md-12'>
          <input type='button' name='cancel' className='cancel action-button'
            value='Cancel' onClick={this.props.onCancelForm}/>
          <input type='button' name='previous' className='previous action-button'
            value='Previous' onClick={this.props.onClickPrevious}/>
          <input type='button' name='submit' className='submit action-button'
            value='Submit' onClick={this.props.handleSubmit}/>
        </div>
      </fieldset>
    );
  }

  handleChangeName(event) {
    this.state.evaluation_template.name = event.target.value;
    this.props.handleEvaluationTemplate(this.state.evaluation_template);
  }

  addEvaluationStandard() {
    this.state.evaluation_template.evaluation_standards.push({});
    this.setState({evaluation_template: this.state.evaluation_template});
    this.props.handleEvaluationTemplate(this.state.evaluation_template);
  }

  changeEvaluationStandard(index, evaluation_standard) {
    this.state.evaluation_template.evaluation_standards[index] = evaluation_standard;
    this.setState({evaluation_template: this.state.evaluation_template});
    this.props.handleEvaluationTemplate(this.state.evaluation_template);
  }

  removeEvaluationStandard(index) {
    if (this.state.evaluation_template.evaluation_standards[index].id) {
      this.state.evaluation_template.evaluation_standards[index]._destroy = true;
    } else {
      this.state.evaluation_template.evaluation_standards.splice(index, 1);
    }
    this.setState({evaluation_template: this.state.evaluation_template});
    this.props.handleEvaluationTemplate(this.state.evaluation_template);
  }

  addTrainingResult() {
    this.state.evaluation_template.training_results.push({});
    this.setState({evaluation_template: this.state.evaluation_template});
    this.props.handleEvaluationTemplate(this.state.evaluation_template);
  }

  changeTrainingResult(index, evaluation_standard) {
    this.state.evaluation_template.training_results[index] = evaluation_standard;
    this.setState({evaluation_template: this.state.evaluation_template});
    this.props.handleEvaluationTemplate(this.state.evaluation_template);
  }

  removeTrainingResult(index) {
    if (this.state.evaluation_template.training_results[index].id) {
      this.state.evaluation_template.training_results[index]._destroy = true;
    } else {
      this.state.evaluation_template.training_results.splice(index, 1);
    }
    this.setState({evaluation_template: this.state.evaluation_template});
    this.props.handleEvaluationTemplate(this.state.evaluation_template);
  }

}
