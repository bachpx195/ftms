import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';
import React from 'react';
import TraineeBlock from './trainee_block';

export default class SubjectBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      free_trainees: props.subjects.free_trainees,
      subjects: props.subjects.subjects
    });
  }

  render() {
    return (
      <div className='subject-structure'>
        {this.renderSubjects()}
        {this.renderFreeTrainees()}
      </div>
    );
  }

  renderFreeTrainees() {
    return (
      <div className='free-trainee'>
        <div className='subject-block'>
          <div className='subject-name'>
            <img src={app_constants.DEFAULT_IMAGE_USER_URL}
              className='img-circle' width='40' height='40'
              alt={I18n.t('organization_charts.positions.free_trainees')} />
            &nbsp;&nbsp;
            <span className='title-name'>
              {I18n.t('organization_charts.positions.free_trainees')}
            </span>
          </div>
          <TraineeBlock trainees={this.state.free_trainees} />
        </div>
      </div>
    );
  }

  renderSubjects() {
    return _.map(this.state.subjects, (subject, index) => {
      return (
        <div key={index} className='subject-block'>
          <div className='subject-name'>
            <a href={routes.subject_url(subject.id)} title={subject.name}>
              <img src={subject.image.url}
                className='img-circle' width='40' height='40'
                alt={subject.name} />
              &nbsp;{subject.name}
            </a>
          </div>
          <TraineeBlock trainees={subject.trainees} />
        </div>
      );
    });
  }
}
