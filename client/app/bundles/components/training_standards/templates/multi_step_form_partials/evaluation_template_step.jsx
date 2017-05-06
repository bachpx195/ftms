import axios from 'axios';
import PanelEvaluationStandards from '../panel_evaluation_standards';
import PanelTrainingResults from '../panel_training_results';
import React from 'react';

export default class EvaluationTemplateStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      evaluation_standards: [],
      training_results: [],
      errors: null,
    }
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
            className='form-control'/>
        </div>
        <PanelEvaluationStandards
          evaluation_standards={this.state.evaluation_standards}
          addEvaluationStandard={this.addEvaluationStandard.bind(this)}
          changeEvaluationStandard={this.changeEvaluationStandard.bind(this)}
          removeEvaluationStandard={this.removeEvaluationStandard.bind(this)} />
        <PanelTrainingResults
          training_results={this.state.training_results}
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
    this.state.name = event.target.value;
    this.props.handleEvaluationTemplate(_.omit(this.state, 'errors'));
  }

  addEvaluationStandard() {
    this.state.evaluation_standards.push({});
    this.setState({evaluation_standards: this.state.evaluation_standards});
    this.props.handleEvaluationTemplate(_.omit(this.state, 'errors'));
  }

  changeEvaluationStandard(index, evaluation_standard) {
    this.state.evaluation_standards[index] = evaluation_standard;
    this.setState({evaluation_standards: this.state.evaluation_standards});
    this.props.handleEvaluationTemplate(_.omit(this.state, 'errors'));
  }

  removeEvaluationStandard(index) {
    if (this.state.evaluation_standards[index].id) {
      this.state.evaluation_standards[index]._destroy = true;
    } else {
      this.state.evaluation_standards.splice(index, 1);
    }
    this.setState({evaluation_standards: this.state.evaluation_standards});
    this.props.handleEvaluationTemplate(_.omit(this.state, 'errors'));
  }

  addTrainingResult() {
    this.state.training_results.push({});
    this.setState({training_results: this.state.training_results});
    this.props.handleEvaluationTemplate(_.omit(this.state, 'errors'));
  }

  changeTrainingResult(index, evaluation_standard) {
    this.state.training_results[index] = evaluation_standard;
    this.setState({training_results: this.state.training_results});
    this.props.handleEvaluationTemplate(_.omit(this.state, 'errors'));
  }

  removeTrainingResult(index) {
    if (this.state.training_results[index].id) {
      this.state.training_results[index]._destroy = true;
    } else {
      this.state.training_results.splice(index, 1);
    }
    this.setState({training_results: this.state.training_results});
    this.props.handleEvaluationTemplate(_.omit(this.state, 'errors'));
  }

}
