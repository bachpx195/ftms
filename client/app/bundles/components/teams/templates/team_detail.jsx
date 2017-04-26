import ButtonCreateProject from '../../projects/actions/create';
import ModalCreateProject from '../../projects/templates/modal';
import React from 'react';

export default class TeamDetail extends React.Component {
  render() {
    return (
      <div className='row team-detail'>
        <div className='col-md-2'>
          <img src={this.props.subject.image.url}
            alt={I18n.t('subjects.alt_image')} className='image-subject' />
        </div>
        <div className='col-md-10'>
          <div className='subject-info col-md-8'>
            <h2 className='subject-name'>
              {this.props.team.name}
            </h2>
            <div>
              {I18n.t('subjects.headers.subject')}
              {this.props.subject.name}
            </div>
            <div className='workings-day'>
              {I18n.t('subjects.headers.workings_day')}
              {this.props.subject.during_time}
              {I18n.t('subjects.headers.days')}
            </div>
            <div className='organization'>
              {I18n.t('subjects.headers.training_standard')}
              {this.props.training_standard.name}
            </div>
          </div>
          <div className='col-md-2 pull-right'>
            <ButtonCreateProject
            />
          </div>
          <ModalCreateProject
            organizations={this.props.organizations}
            team={this.props.team}
            handleAfterActionProject={this.props.handleAfterActionProject} />
        </div>
      </div>
    )
  }
}
