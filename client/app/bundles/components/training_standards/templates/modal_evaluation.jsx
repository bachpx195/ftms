import * as routes from 'config/routes';
import axios from 'axios';
import css from '../assets/training_standard.scss';
import PanelEvaluationStandards from './panel_evaluation_standards';
import PanelTrainingResults from './panel_training_results';
import React from 'react';
import ReactOnRails from 'react-on-rails';

export default class ModalEvaluation extends React.Component {
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
    return(
      <div className='modal-evaluation-template modal fade in' role='dialog'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>
                {I18n.t('training_standards.evaluation_template')}
              </h4>
            </div>
            <div className='modal-body'>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className='form-group'>
                  <label>
                    {I18n.t('evaluation_templates.headers.name')}
                  </label>
                  <input type='text' name='name' ref='nameField'
                    onChange={this.handleChangeName.bind(this)}
                    className='form-control' value={this.state.name} />
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
                    <PanelEvaluationStandards
                      evaluation_standards={this.state.evaluation_standards}
                      addEvaluationStandard={this.addEvaluationStandard
                        .bind(this)}
                      changeEvaluationStandard={this.changeEvaluationStandard
                        .bind(this)}
                      removeEvaluationStandard={this.removeEvaluationStandard
                        .bind(this)} />
                  </div>
                  <div className='panel_training_results tab-pane fade'>
                    <PanelTrainingResults
                      training_results={this.state.training_results}
                      addTrainingResult={this.addTrainingResult.bind(this)}
                      changeTrainingResult={this.changeTrainingResult
                        .bind(this)}
                      removeTrainingResult={this.removeTrainingResult
                        .bind(this)} />
                  </div>
                </div>
                <div className='form-group'>
                  <div className='text-right'>
                    <button type='submit' className='btn btn-primary'
                      disabled={!this.formValid()}>
                      {I18n.t('buttons.save')}</button>
                  </div>
                </div>
              </form>
           </div>
          </div>
        </div>
      </div>
    );
  }

  handleChangeName(event) {
    this.state.name = event.target.value;
    this.props.setEvaluationTemplate(_.omit(this.state, 'errors'));
  }

  formValid(){
    let check_evaluation_standard = this.state.evaluation_standards
      .findIndex(standard => !standard.name || standard.name.length == 0) < 0;
    let check_training_result = this.state.training_results
      .findIndex(result => !result.name || result.name.length == 0) < 0;
    return this.state.name != '' && check_evaluation_standard &&
      check_training_result;
  }

  handleSubmit(event) {
    event.preventDefault();
    let url = routes.training_standard_evaluation_template_url(
      this.props.training_standard.id);

    let standards = this.state.evaluation_standards;
    this.props.old_evaluation_standards.map(standard => {
      let index = standards.findIndex(standard_ => {
        return standard_.id == standard.id;
      });
      if (index < 0) {
        Object.assign(standard, {_destroy: true});
        standards.push(standard);
      }
    });

    let results = this.state.training_results;
    this.props.old_training_results.map(result => {
      let index = results.findIndex(result_ => {
        return result_.id == result.id;
      });
      if (index < 0) {
        Object.assign(result, {_destroy: true});
        results.push(result);
      }
    });

    let method = this.props.evaluation_template.id ? 'PUT' : 'POST';
    axios({
      url: url + '.json',
      method: method,
      data: {
        evaluation_template: {
          name: this.refs.nameField.value,
          evaluation_standards_attributes: standards,
          training_results_attributes: results,
        },
        authenticity_token: ReactOnRails.authenticityToken()
      },
    })
      .then(response => {
        this.props.afterSaveEvaluationTemplate(response.data
          .evaluation_template);
        $('.modal-evaluation-template').modal('hide');
      })
      .catch(error => {
        console.log(error);
        this.setState({errors: error.response.data.errors});
      });
  }

  addEvaluationStandard(){
    this.state.evaluation_standards.push({});
    this.props.setEvaluationTemplate(_.omit(this.state, 'errors'));
  }

  changeEvaluationStandard(index, evaluation_standard) {
    this.state.evaluation_standards[index] = evaluation_standard;
    this.props.setEvaluationTemplate(_.omit(this.state, 'errors'));
  }

  removeEvaluationStandard(index) {
    this.state.evaluation_standards.splice(index, 1);
    this.props.setEvaluationTemplate(_.omit(this.state, 'errors'));
  }

  addTrainingResult(){
    this.state.training_results.push({});
    this.props.setEvaluationTemplate(_.omit(this.state, 'errors'));
  }

  changeTrainingResult(index, evaluation_standard) {
    this.state.training_results[index] = evaluation_standard;
    this.props.setEvaluationTemplate(_.omit(this.state, 'errors'));
  }

  removeTrainingResult(index) {
    this.state.training_results.splice(index, 1);
    this.props.setEvaluationTemplate(_.omit(this.state, 'errors'));
  }
}
