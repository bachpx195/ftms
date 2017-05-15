import React from 'react';

export default class TrainingStandardPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: props.start_date
    };
  }

  componentDidMount() {
    this.props.afterRenderTimeline();
  }

  componentDidUpdate() {
    this.props.afterRenderTimeline();
  }

  render() {
    let render_current_item = null;
    let total_time = 0;
    if (this.props.current_item != '') {
      this.props.current_item.subjects.map(subject => {
        total_time += parseInt(subject.during_time);
      });
      render_current_item = (
        <div id='program-intern' className='clearfix'>
          <div className='container msform-relative'>
            {this.renderTimelineContent()}
          </div>
        </div>
      );
    }
    return (
      <div>
        <section className='msform-program-progress'>
          {render_current_item}
        </section>
        <h4>
          {I18n.t('programs.multi_step_form.total_working_day')}
          &nbsp;{total_time}
        </h4>
      </div>
    );
  }

  renderTimeLineItems() {
    let orientation = 'down';
    return this.props.current_item.subjects.map(subject => {
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
    let total_time = 7;
    this.props.current_item.subjects.map(subject => {
      total_time += parseInt(subject.during_time);
    });
    let start_date = new Date(this.props.course.start_date);
    let end_date = ''
    if (this.props.course.end_date) {
      end_date = this.props.course.end_date;
    } else {
      end_date = new Date(start_date);
      end_date.setDate(end_date.getDate() + total_time + Math.floor(total_time/5)*2);
    }
    return (
      <div className='col-sm-12 msform-subject-timeline course-form'
        data-total-col={total_time}>
        <div className='event1Bubble'>
          <div className='eventTime'>
            <div className='Day'>
              {this.renderFormatTime(start_date)}
            </div>
          </div>
          <div className='eventTitle'>{I18n.t('courses.start_date')}</div>
        </div>
        {this.renderTimeLineItems()}
        <div className='event2Bubble'>
          <div className='eventTime'>
            <div className='Day'>
              {this.renderFormatTime(end_date)}
            </div>
          </div>
          <div className='eventTitle'>{I18n.t('courses.end_date')}</div>
        </div>
      </div>
    );
  }

  renderFormatTime(time) {
    if (time != null) {
      return I18n.l('date.formats.default', time);
    }
    return null;
  }
}
