import React from 'react';
import Modal from '../../projects/templates/modal';

export default class Subjects extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subject_detail: props.subject_detail
    }
  }

  render() {
    return (
      <div>
        <div className='col-md-2'>
          <img src={this.state.subject_detail.image.url}
            alt={I18n.t('subjects.alt_image')} className='image-subject' />
        </div>
        <div className='col-md-10'>
          <div className='subject-info col-md-9'>
            <h2 className='subject-name'>
              {this.state.subject_detail.name}
            </h2>
            <div className='description'>
              {this.state.subject_detail.description}
            </div>
            <div className='workings-day'>
              {I18n.t('subjects.headers.workings_day')}
              {this.state.subject_detail.during_time}
              {I18n.t('subjects.headers.days')}
            </div>
            <div className='organization'>
              {I18n.t('subjects.headers.training_standard')}
              {this.state.subject_detail.training_standard.name}
            </div>
          </div>
          <div className='col-md-3 text-right'>
            <Modal organizations={this.props.organizations}
              subject_detail={this.state.subject_detail} />
          </div>
        </div>
      </div>
    );
  }
}
