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

const POLICIES = app_constants.POLICIES;

export default class MultiStepForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props,
      name: props.training_standard.name || '',
      description: props.training_standard.description || '',
      policy: props.training_standard.policy || POLICIES[0].id,
      select_subjects: [],
      errors: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.training_standard.name || '',
      description: nextProps.training_standard.description || '',
      policy: nextProps.training_standard.policy || POLICIES[0].id,
      errors: null
    });
  }

  render() {
    return (
      <form className='multi-step-form row' onSubmit={this.handleSubmit.bind(this)}>
        <ul className='multi-step-progress-bar'>
          <li className='active'>Create Training Standard</li>
          <li>Assign Subject</li>
          <li>Create Evaluation Template</li>
        </ul>
        <TrainingStandardStep handleChange={this.handleChange.bind(this)}
          onClickNext={step_animations.onNextStep}
          onClickPrevious={step_animations.onPreviousStep} />
        <AssignSubjectStep subjects={this.props.subjects}
          onClickNext={step_animations.onNextStep}
          onClickPrevious={step_animations.onPreviousStep} />
        <EvaluationTemplateStep handleSubmit={this.handleSubmit.bind(this)}
          onClickPrevious={step_animations.onPreviousStep} />
      </form>
    );
  }

  handleChange(event) {
    let attribute = event.target.name;
    this.setState({
      [attribute]: event.target.value
    });
  }

  formValid() {
    return this.state.name != '' && this.state.description != ''
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();

    let training_standard = _.omit(this.state, 'errors');

    for(let key of Object.keys(training_standard)) {
      formData.append('training_standard[' + key + ']', training_standard[key]);
    }
    if (this.props.training_standard.id == null) {
      formData.append('training_standard[organization_id]',
        this.props.organization.id);
    }
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    let method = this.props.training_standard.id ? 'PUT' : 'POST';
    axios({
      url: window.location.href,
      method: method,
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      if(this.props.training_standard.id) {
        $('.modalCreateTrainingStandard').modal('hide');
        $('.modal-edit').modal('hide');
      } else {
        this.setState({
          name: '',
          description: '',
          policy: POLICIES[0].id,
          errors: null,
        });
      }
      this.props.handleAfterSaved(response.data.training_standard);
    })
    .catch(error => {
      this.setState({errors: error.response.data.errors});
    });
  }
}
