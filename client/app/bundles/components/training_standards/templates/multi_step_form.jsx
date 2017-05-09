import axios from 'axios';
import AssignSubjectStep from './multi_step_form_partials/assign_subject_step';
import Dropzone from 'react-dropzone';
import EvaluationTemplateStep from './multi_step_form_partials/evaluation_template_step';
import React from 'react';
import ReactOnRails from 'react-on-rails';
import TrainingStandardStep from './multi_step_form_partials/training_standard_step';
import _ from 'lodash';
import * as app_constants from 'constants/app_constants';
import * as step_animations from 'shared/multi_step_animation';
import * as routes from 'config/routes';

const POLICIES = app_constants.POLICIES;

export default class MultiStepForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      training_standard: props.training_standard || {
        name: '', description: '', policy: POLICIES[0].id
      },
      select_subjects: [],
      evaluation_template: props.evaluation_template || {
        name: '', training_results: [], evaluation_standards: [],
      },
      errors: null
    };
  }

  render() {
    return (
      <div>
        <TrainingStandardStep
          training_standard={this.state.training_standard}
          handleInfoChanged={this.handleInfoChanged.bind(this)}
          onClickNext={step_animations.onNextStep}
          onCancelForm={step_animations.onCancelForm} />
        <AssignSubjectStep subjects={this.props.subjects}
          remain_subjects={this.props.remain_subjects}
          select_subjects={this.state.select_subjects}
          selected_subjects={this.props.selected_subjects}
          training_standard={this.state.training_standard}
          standard_subjects={this.props.standard_subjects}
          afterRenderTimeline={step_animations.afterRenderTimeline}
          handleSelectedSubjects={this.handleSelectedSubjects.bind(this)}
          onCancelForm={step_animations.onCancelForm}
          onClickNext={step_animations.onNextStep}
          onClickPrevious={step_animations.onPreviousStep} />
        <EvaluationTemplateStep handleSubmit={this.handleSubmit.bind(this)}
          evaluation_template={this.state.evaluation_template}
          handleEvaluationTemplate={this.handleEvaluationTemplate.bind(this)}
          onCancelForm={step_animations.onCancelForm}
          onClickPrevious={step_animations.onPreviousStep} />
      </div>
    );
  }

  handleInfoChanged(training_standard) {
    this.setState({
      training_standard: training_standard,
    });
  }

  handleSelectedSubjects(select_subjects) {
    this.setState({
      select_subjects: select_subjects,
    });
  }

  handleEvaluationTemplate(evaluation_template) {
    this.setState({
      evaluation_template: evaluation_template,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();
    let training_standard = this.state.training_standard;
    for(let key of Object.keys(training_standard)) {
      formData.append('training_standard[' + key + ']', training_standard[key]);
    }
    this.state.select_subjects.map((subject, index) => {
      formData.append(
        'training_standard[standard_subjects_attributes][' + index + '][subject_id]',
        subject.id
      );
    });
    let evaluation_template = this.state.evaluation_template;
    for(let key of Object.keys(evaluation_template)) {
      formData.append('training_standard[evaluation_template_attributes][' + key +']',
        evaluation_template[key]);
    }

    let evaluation_standards = this.state.evaluation_template.evaluation_standards;
    evaluation_standards.map((evaluation_standard, index) => {
      for(let key of Object.keys(evaluation_standard)) {
        if (evaluation_standard[key]) {
          formData.append(
            'training_standard[evaluation_template_attributes]' +
            '[evaluation_standards_attributes][' + index + '][' + key +']',
            evaluation_standard[key]
          );
        }
      }
    });
    let training_results = this.state.evaluation_template.training_results;
    training_results.map((training_result, index) => {
      for(let key of Object.keys(training_result)) {
        if (training_result[key]) {
          formData.append(
            'training_standard[evaluation_template_attributes]' +
            '[training_results_attributes][' + index + '][' + key +']',
            training_result[key]
          );
        }
      }
    });
    formData.append('training_standard[organization_id]',
      this.props.organization.id);
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    let method = 'POST';
    let url = window.location.href;
    let current_standard_id = this.state.training_standard.id;
    if (current_standard_id) {
      method = 'PUT';
      url = routes.organization_training_standard_url(this.props.organization.id,
       this.state.training_standard.id);
    }
    let target = event.target;
    axios({
      url: url,
      method: method,
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      if (current_standard_id) {
        this.props.handleAfterEdit(response.data.training_standard);
      } else {
        this.props.handleAfterSaved(response.data.training_standard);
        this.setState({
          training_standard: {name: '', description: '', policy: POLICIES[0].id},
          select_subjects: [],
          evaluation_template: {
            name: '', training_results: [], evaluation_standards: [],
          },
          errors: null,
        });
      }
      step_animations.afterSubmit(target);
    })
    .catch(error => {
      this.setState({errors: error.response.data.errors});
    });
  }
}
