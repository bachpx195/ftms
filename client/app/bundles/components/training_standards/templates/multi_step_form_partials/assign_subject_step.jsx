import axios from 'axios';
import React from 'react';
import SubjectLists from './subject_lists';
import * as app_constants from 'constants/app_constants';

const POLICIES = app_constants.POLICIES;

export default class AssignSubjectStep extends React.Component {
  constructor(props) {
    super(props);
    let total_time = 0;
    let current_subject_list = props.select_subjects || []
    current_subject_list.map(subject => {
      total_time += parseInt(subject.during_time);
    });

    this.state = {...props,
      select_subjects: props.select_subjects || [],
      selected_subjects: props.selected_subjects || [],
      subject_search: props.subjects,
      total_time: total_time,
    }
  }

  componentWillReceiveProps(nextProps) {
    let total_time = 0;
    let current_subject_list = nextProps.select_subjects || []
    current_subject_list.map(subject => {
      total_time += parseInt(subject.during_time);
    });
    this.setState({
      total_time: total_time,
      training_standard: nextProps.training_standards,
    });
  }

  componentDidMount() {
    this.props.afterRenderTimeline();
  }

  componentDidUpdate() {
    this.props.afterRenderTimeline();
  }

  renderTimeLineItems() {
    let orientation = 'down';
    let timeline_subjects = [...this.state.selected_subjects,
      ...this.state.select_subjects];
    return timeline_subjects.map(subject => {
      let day = I18n.t('training_standards.subject_preview.day');
      let time = parseInt(subject.during_time);
      if (time > 1 || time == 0) {
        day = I18n.t('training_standards.subject_preview.days');
      }
      orientation = orientation == 'down' ? 'up' : 'down';
      return (
        <div key={subject.id} className={`col-sm-3 timeline-block ${orientation}`}
          data-col={subject.during_time}>
          <div className='timeline-content'>
            <div className='timeline-heading'>
              <div className='img'>
                <img src={subject.image.url} className='img-circle' />
              </div>
            </div>
            <div className='timeline-body'>
              <h3 className='title'>{subject.name}</h3>
              <h4 className='subject-duration'>
                {subject.during_time + day}
              </h4>
            </div>
          </div>
        </div>
      );
    });
  }

  renderTimelineContent() {
    let total_time = 0;
    this.state.select_subjects.map(subject => {
      total_time += parseInt(subject.during_time);
    });
    return (
      <div className='col-sm-12 msform-subject-timeline'
        data-total-col={total_time}>
        {this.renderTimeLineItems()}
      </div>
    );
  }

  render() {
    let standard_info = '';
    if (this.props.training_standard) {
      standard_info = <div className='col-md-12'>
        <div className='col-md-6'>
          <h4>
            {I18n.t('training_standards.multi_step_form.standard_name')}
            {this.props.training_standard.name}
          </h4>
        </div>
        <div className='col-md-6'>
          <h4>
            {I18n.t('training_standards.multi_step_form.policy')}
            {this.props.training_standard.policy || POLICIES[0].id}
          </h4>
        </div>
      </div>
    }
    return (
      <fieldset>
        {standard_info}
        <input className='form-control search_form' autoComplete='off'
          placeholder={I18n.t('subjects.search')}
          onChange={this.filterSubjects.bind(this)}/>
        <div className='panel panel-primary'>
          <div className='panel-body'>
            <SubjectLists
              subjects={this.state.subjects}
              remain_subjects={this.state.remain_subjects}
              selected_subjects={this.state.selected_subjects}
              standard_subjects={this.state.standard_subjects}
              training_standard={this.state.training_standard}
              select_subjects={this.state.select_subjects}
              handleSelectedSubjects={this.props.handleSelectedSubjects} />
          </div>
        </div>
        <section className='msform-program-progress'>
          <div className='clearfix'>
            <div className='container msform-relative'>
              {this.renderTimelineContent()}
            </div>
          </div>
        </section>
        <div className='text-center col-md-12'>
          <h4>
            {I18n.t('training_standards.multi_step_form.total_day')}
            {this.state.total_time}
          </h4>
        </div>
        <div className='text-center col-md-12'>
          <input type='button' name='cancel' className='cancel action-button'
            value='Cancel' onClick={this.props.onCancelForm}/>
          <input type='button' name='previous' className='previous action-button'
            value='Previous' onClick={this.props.onClickPrevious}/>
          <input type='button' name='next' className='next action-button'
            value='Next' onClick={this.props.onClickNext}/>
        </div>
      </fieldset>
    );
  }

  filterSubjects(event) {
    let value = event.target.value;
    this.state.subjects = this.state.subject_search.filter(subject => {
      return subject.name.toLowerCase().includes(value.toLowerCase())
    });
    this.setState({subjects: this.state.subjects});
  }

  chooseSubjectItem(select_subjects) {
    this.setState ({
      total_time: total_time,
      select_subjects: select_subjects,
    });
    this.props.handleSelectedSubjects(select_subjects);
  }
}
