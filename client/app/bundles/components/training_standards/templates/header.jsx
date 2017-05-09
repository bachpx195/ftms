import Clone from '../actions/clone';
import Share from '../actions/share';
import React from 'react';
import TrainingStandardPolicy from 'policy/training_standard_policy';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shared_withs: props.training_standard.organizations,
      organization: props.organization,
      training_standard: props.training_standard
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      shared_withs: nextProps.training_standard.organizations,
      organization: nextProps.organization,
      training_standard: nextProps.training_standard
    })
  }

  render() {
    let button_text = '';
    if (this.props.evaluation_template.id) {
      button_text = I18n.t('training_standards.show_evaluation');
    } else {
      button_text = I18n.t('training_standards.create_evaluation');
    }

    let count_shared = null;
    let class_policy = 'fa-globe';
    if (this.props.training_standard.policy == 'privated') {
      class_policy = 'fa-lock';
      count_shared = (
        <span className='shared-organizations'
          title={I18n.t('training_standards.shared_organizations')}>
          <i className='fa fa-share-alt'></i> &nbsp;
          {this.state.shared_withs.length}
        </span>
      );
    }

    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='box-header with-border'>
            <h3 className='box-title'>
              <i className={`fa ${class_policy}`}></i> &nbsp;
              {this.props.training_standard.name}
              {count_shared}
            </h3>
            <div className='pull-right'>
              <Share training_standard={this.props.training_standard}
                organization={this.props.organization}
                standard_organizations={this.props.standard_organizations}
                handleAfterShareTrainingStandard={this
                  .handleAfterShareTrainingStandard.bind(this)} />
              <TrainingStandardPolicy permit={[
                {action: ['ownerById'], data: {id: this.state.organization.user_id}},
                {action: ['update', 'creator'], data: {creator_id: this.state.organization.creator_id}},
                {action: ['update', 'creator'], data: {creator_id: this.state.training_standard.creator_id}},
                {action: ['update', 'belongById'], data: {id: this.state.organization.id}},
              ]}>
                <button type='button' className='btn btn-success header-button'
                  title={I18n.t('training_standards.modals.header_edit')}
                  onClick={this.onClickButtonEdit.bind(this)}>
                  <i className='fa fa-pencil'></i> &nbsp;
                  {I18n.t('training_standards.edit')}
                </button>
              </TrainingStandardPolicy>
            </div>
          </div>
        </div>
        <div className='col-md-12 list-buttons'>
          <TrainingStandardPolicy permit={[
            {action: ['ownerById'], data: {id: this.state.organization.user_id}},
            {action: ['update', 'creator'], data: {creator_id: this.state.organization.creator_id}},
            {action: ['update', 'creator'], data: {creator_id: this.state.training_standard.creator_id}},
            {action: ['update', 'belongById'], data: {id: this.state.organization.id}},
          ]}>
            <button type='button' className='btn btn-success header-button'
              title={I18n.t('training_standards.assign')}
              onClick={this.onClickButtonAssignSubject.bind(this)}>
              <i className='fa fa-plus'></i> &nbsp;
              {I18n.t('training_standards.assign')}
            </button>
          </TrainingStandardPolicy>
          <TrainingStandardPolicy permit={[
            {action: ['ownerById'], data: {id: this.state.organization.user_id}},
            {action: ['update', 'creator'], data: {creator_id: this.state.organization.creator_id}},
            {action: ['update', 'creator'], data: {creator_id: this.state.training_standard.creator_id}},
            {action: ['update', 'belongById'], data: {id: this.state.organization.id}},
          ]}>
            <button type='button' className='btn btn-success header-button'
              title={I18n.t('training_standards.create_evaluation')}
              onClick={this.showModalEvaluationTemplate.bind(this)}>
              <i className='fa fa-eye'></i> {button_text}
            </button>
          </TrainingStandardPolicy>
          <Clone training_standard={this.props.training_standard}
            organization={this.props.organization}
          />
        </div>
      </div>
    );
  }

  showModalEvaluationTemplate() {
    $('.modal-evaluation-template').modal();
  }

  onClickButtonAssignSubject() {
    $('#modalAssignSubject').modal();
  }

  onClickButtonEdit() {
    $('.modal-edit').modal({
        backdrop: 'static',
    });
  }

  handleAfterShareTrainingStandard(selected_organizations) {
    this.state.shared_withs = this.state.shared_withs
      .concat(selected_organizations);
    this.setState({
      shared_withs: this.state.shared_withs
    });
  }
}
