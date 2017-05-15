import * as step_animations from 'shared/multi_step_animation';
import EvaluationStandards from './previews/evaluation_standards';
import ItemDetail from './previews/item_detail';
import React from 'react';
import StandardSubjects from './previews/standard_subjects';
import TrainingStandardPreview from '../../programs/templates/multi_step_form_partials/training_standard_preview';

export default class ModalTrainingStandard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {name: '', content: ''},
    }
  }

  render() {
    let item_detail = '';
    if (this.state.item.name) {
      item_detail = <ItemDetail item={this.state.item}/>;
    }

    return (
      <div className='modal-training-standard modal fade'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>
                &times;
              </button>
              <h4 className='modal-title'>
                {I18n.t('courses.training_standard')}:&nbsp;
                {this.props.course.training_standard.name || ''}
              </h4>
            </div>
            <div className='modal-body td-manager-profile-list'>
              <TrainingStandardPreview course={this.props.course}
                afterRenderTimeline={step_animations.afterRenderTimeline}
                current_item={this.props.course.training_standard} />
              <StandardSubjects
                handleSubjectDetails={this.handleSubjectDetails.bind(this)}
                handleTaskDetails={this.handleTaskDetails.bind(this)}
                subjects={this.props.course.training_standard.subjects} />
              {item_detail}
              <div className='clearfix'></div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-default'
                data-dismiss='modal'>
                {I18n.t('courses.close')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleSubjectDetails(index) {
    let subject = this.props.course.training_standard.subjects[index];
    Object.assign(this.state.item, {name: subject.name, content: subject.content});
    this.setState({
      item: this.state.item,
    });
  }

  handleTaskDetails(subject_index, task_index) {
    let subject = this.props.course.training_standard.subjects[subject_index];
    let all_tasks = [...subject.assignments, ...subject.surveys];
    let task = all_tasks[task_index];
    Object.assign(this.state.item, {name: task.name, content: task.content});
    this.setState({
      item: this.state.item,
    });
  }
}
