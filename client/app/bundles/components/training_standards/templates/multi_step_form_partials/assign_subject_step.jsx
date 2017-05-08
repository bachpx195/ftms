import axios from 'axios';
import React from 'react';
import SubjectLists from './subject_lists';

export default class AssignSubjectStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props,
      select_subjects: [],
      subject_search: props.subjects,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
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
    return this.state.select_subjects.map(subject => {
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
    let standard_name = '';
    if (this.props.training_standard) {
      standard_name = <div className='col-md-12'>
        <h3>
          {I18n.t('training_standards.multi_step_form.standard_name')}
          {this.props.training_standard.name}
        </h3>
      </div>
    }
    return (
      <fieldset>
        {standard_name}
        <input className='form-control search_form' autoComplete='off'
          placeholder={I18n.t('subjects.search')}
          onChange={this.filterSubjects.bind(this)}/>
        <div className='panel panel-primary'>
          <div className='panel-body'>
            <SubjectLists
              subjects={this.state.subjects}
              selected_subjects={this.state.selected_subjects}
              standard_subjects={this.state.standard_subjects}
              training_standard={this.state.training_standard}
              select_subjects={this.state.select_subjects}
              chooseSubjectItem={this.chooseSubjectItem.bind(this)} />
          </div>
        </div>
        <section className='msform-program-progress'>
          <div id='program-intern' className='clearfix'>
            <div className='container msform-relative'>
              {this.renderTimelineContent()}
            </div>
          </div>
        </section>
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
      select_subjects: select_subjects
    });
    this.props.handleSelectedSubjects(select_subjects);
  }
}
