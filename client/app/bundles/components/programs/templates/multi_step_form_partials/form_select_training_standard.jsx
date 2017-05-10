import React from 'react';
import ReactOnRails from 'react-on-rails';
import TrainingStandardPreview from './training_standard_preview';

require('../../../../assets/sass/program_show.scss');

export default class SelectTraningStandard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      program_detail: {},
      owners: props.owners,
      training_standards: props.program_detail.training_standards,
      current_item: props.current_item,
      start_date: null,
      course: props.course
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.current_item) {
      this.showEndDate(nextProps.course.start_date, nextProps.current_item)
    }
    this.setState({
      program_detail: nextProps.program_detail,
      errors: null,
      owners: nextProps.owners,
      course: this.state.course,
      current_item: nextProps.current_item,
      training_standards: nextProps.program_detail.training_standards
    });
  }

  render() {
    let training_standard_preview = '';
    if (this.state.current_item) {
      training_standard_preview = (
        <TrainingStandardPreview current_item={this.state.current_item}
          afterRenderTimeline={this.props.afterRenderTimeline}
          course={this.state.course} />
      );
    }

    return (
      <fieldset>
        <div className='nht-course-date'>
          <div className='col-sm-6 course-start-date'>
            <label>{I18n.t('courses.start_date')}</label>
            <input type='date' onChange={this.handleChangeTime.bind(this)}
              name='start_date' className='form-control'
              value={this.state.course.start_date}/>
          </div>
          <div className='col-sm-6 course-start-date'>
            <label>{I18n.t('courses.end_date')}</label>
            <input type='date' onChange={this.handleChangeTime.bind(this)}
              name='end_date' className='form-control'
              value={this.state.course.end_date}/>
          </div>
        </div>
        <input className='form-control search_form' autoComplete='off'
          placeholder={I18n.t('subjects.search')}
          onChange={this.filterTrainingStandard.bind(this)}/>
        <div className='panel panel-primary'>
          <div className='panel-body'>
            <div className='subject-container'>
              <ul className='list-group custom-subject-list'>
                {this.renderTrainingStandard()}
              </ul>
            </div>
          </div>
        </div>
        {training_standard_preview}
        <div className='text-center col-md-12'>
          <input type='button' name='cancel' className='cancel action-button'
            value={I18n.t('programs.button.cancel')}
            onClick={this.props.onCancelForm}/>
          <input type='button' name='next' className='next action-button'
            value={I18n.t('programs.button.previous')}
            onClick={this.props.onClickPrevious}/>
          <input type='button' name='next' className='next action-button'
            value={I18n.t('programs.button.next')}
            onClick={this.props.onClickNext}/>
        </div>
      </fieldset>
    );
  }

  isIncludeTrainingStandards(training_standard, value) {
    return training_standard.name.toLowerCase().includes(value.toLowerCase());
  }

  filterTrainingStandard(event) {
    let value = event.target.value;
    let training_standards = '';
    training_standards = this.state.training_standards
      .filter(training_standard => {
      return this.isIncludeTrainingStandards(training_standard, value);
    });
    if (value == '') {
      this.setState({
        training_standards: this.props.program_detail.training_standards
      });
    } else {
      this.setState({
        training_standards: training_standards
      });
    }
  }

  renderTrainingStandard() {
    return this.state.training_standards.map((training_standard, index) => {
      return (
        <li className='list-group-item' key={index}>
          <label className='list-group-item cursor'
            value={training_standard.id} >
            <input type='radio' name='radio' key={training_standard.id}
              onChange={this.handleOptionChange.bind(this)}
              value={training_standard.id} />
            {training_standard.name}
          </label>
        </li>
      )
    })
  }

  handleOptionChange(event) {
    let value = event.target.value
    let training_standard = this.state.training_standards
      .find(result => result.id == value);
    Object.assign(this.state.course, {training_standard_id: training_standard.id});
    this.showEndDate(this.state.course.start_date, training_standard);
    this.setState({
      course: this.state.course,
      current_item: training_standard
    });
    this.props.afterInputFormTrainingStandard(this.state.course, training_standard);
  }

  handleChangeTime(event) {
    let attribute = event.target.name;
    Object.assign(this.state.course, {[attribute]: event.target.value});
    this.setState({
      course: this.state.course,
    });
    this.props.afterInputFormTrainingStandard(this.state.course, this.state.current_item);
  }

  showEndDate(start_date, training_standard) {
    let total_time = 0;
    training_standard.subjects.map(subject => {
      total_time += parseInt(subject.during_time);
    });
    if (start_date) { 
      if (!this.state.course.end_date) {
        let end_date = new Date(start_date);
        end_date.setDate(end_date.getDate() + total_time + Math.floor(total_time/5)*2);
        this.state.course.end_date = end_date.toISOString().slice(0,10);
      }
    }
  }
}
