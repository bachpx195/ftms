import _ from 'lodash';
import * as app_constants from 'constants/app_constants';
import * as step_animations from 'shared/multi_step_animation';
import * as routes from 'config/routes';
import AssignOwner from './multi_step_form_partials/form_assign_owner';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import FormCourse from './multi_step_form_partials/form_course';
import FormAssignOwner from './multi_step_form_partials/form_assign_owner';
import React from 'react';
import ReactOnRails from 'react-on-rails';
import SelectTraningStandard from './multi_step_form_partials/form_select_training_standard';

export default class MultiStepForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: {
        name: '', description: '', image: '',  language_id: '',
        start_date: '', end_date: '', owner_id: '', training_standard_id: '',
      },
      current_item: '',
      selected_role: '',
      owner_name: ''
    }
  }
  render() {
    return (
      <div>
        <FormCourse
          program_detail={this.props.program_detail}
          program={this.props.program}
          course={this.state.course}
          afterRenderTimeline={step_animations.afterRenderTimeline}
          onCancelForm={step_animations.onCancelForm}
          onClickNext={step_animations.onNextStep}
          onClickPrevious={step_animations.onPreviousStep}
          afterInputFormCourse={this.afterInputFormCourse.bind(this)}/>
        <SelectTraningStandard program_detail={this.props.program_detail}
          program={this.props.program}
          course={this.state.course}
          afterRenderTimeline={step_animations.afterRenderTimeline}
          onCancelForm={step_animations.onCancelForm}
          onClickNext={step_animations.onNextStep}
          onClickPrevious={step_animations.onPreviousStep}
          afterInputFormTrainingStandard = {this.afterInputFormTrainingStandard.bind(this)}
          current_item={this.state.current_item}
          />
        <FormAssignOwner handleSubmit={this.handleSubmit.bind(this)}
          course={this.state.course}
          selected_role={this.state.selected_role}
          all_roles={this.props.all_roles}
          owners={this.props.owners}
          owner_name={this.state.owner_name}
          onCancelForm={step_animations.onCancelForm}
          onClickPrevious={step_animations.onPreviousStep}
          afterInputFormAssignOwner = {this.afterInputFormAssignOwner.bind(this)}
          />
      </div>
    );
  }

  afterInputFormCourse(course, image) {
    this.state.course.image = image;
    Object.assign(course, {image: image});
    this.setState({
      course: course
    });
  }

  afterInputFormTrainingStandard(course, current_item) {
    this.setState({
      course: course,
      current_item: current_item
    });
  }

  afterInputFormAssignOwner(course, selected_role, owner_name) {
    this.setState({
      course: course,
      selected_role: selected_role,
      owner_name: owner_name
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();
    let course = this.state.course;
    course.language_id = parseInt(course.language_id);
    course.owner_id = parseInt(course.owner_id);
    formData.append('course[image]', course.image);
    formData.append('course[language_id]', course.language_id);
    formData.append('course[name]', course.name);
    formData.append('course[start_date]', course.start_date);
    formData.append('course[end_date]', course.end_date);
    formData.append('course[training_standard_id]', course.training_standard_id);
    formData.append('course[owner_id]', course.owner_id);
    formData.append('course[description]', course.description);
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    let target = event.target;
    axios({
      url: routes.prorgam_courses_url(this.props.program.id),
      method: 'POST',
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      step_animations.afterSubmit(target);
      $('.modal-edit').modal('hide');
      this.props.handleAfterClickCreateCourse(response.data.course);
      this.setState({
        course: {
          name: '', description: '', image: '',  language_id: '',
          start_date: '', end_date: '', owner_id: '', training_standard_id: '',
        },
        current_item: '',
        selected_role: '',
        owner_name: ''
      });

    })
    .catch(error => {
      this.setState({errors: error.response.data.errors});
    });
  }
}
