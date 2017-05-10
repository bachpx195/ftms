import axios from 'axios';
import React from 'react';
import SubjectLists from './subject_lists';
import * as app_constants from 'constants/app_constants';

const POLICIES = app_constants.POLICIES;

export default class AssignSubjectStep extends React.Component {
  constructor(props) {
    super(props);
    let selected_subjects = props.selected_subjects || [];
    let timeline_subjects = [...selected_subjects,
      ...props.select_subjects];
    let total_time = 0;
    timeline_subjects.map(subject => {
      total_time += parseInt(subject.during_time);
    });

    this.state = {...props,
      select_subjects: props.select_subjects || [],
      selected_subjects: props.selected_subjects || [],
      subject_search: props.subjects,
      total_time: total_time,
      timeline_subjects: timeline_subjects,
    }
  }

  componentWillReceiveProps(nextProps) {
    let selected_subjects = nextProps.selected_subjects || [];
    let timeline_subjects = [...selected_subjects,
      ...nextProps.select_subjects];
    let total_time = 0;
    timeline_subjects.map(subject => {
      total_time += parseInt(subject.during_time);
    });
    this.setState({
      total_time: total_time,
      select_subjects: nextProps.select_subjects,
      training_standard: nextProps.training_standard,
      timeline_subjects: timeline_subjects,
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
    return this.state.timeline_subjects.map(subject => {
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
    let total_time = this.state.total_time;
    return (
      <div className='col-sm-12 msform-subject-timeline'
        data-total-col={total_time}>
        {this.renderTimeLineItems()}
      </div>
    );
  }

  render() {
    return (
      <fieldset>
        <div className='form-group'>
          <input className='form-control search_form' autoComplete='off'
            placeholder={I18n.t('subjects.search')}
            onChange={this.filterSubjects.bind(this)}/>
        </div>
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
        <div className='col-md-12'>
          <input type='button' name='cancel' className='cancel cancel-button pull-left'
            value='Cancel' onClick={this.handleCancelForm.bind(this)}/>
          <input type='button' name='next' className='next action-button pull-right'
            value='Next' onClick={this.props.onClickNext}/>
          <input type='button' name='previous' className='previous action-button pull-right'
            value='Previous' onClick={this.props.onClickPrevious}/>
        </div>
      </fieldset>
    );
  }

  handleCancelForm(event) {
    this.props.handleResetForm();
    this.props.onCancelForm(event);
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
