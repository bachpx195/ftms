import Clone from '../actions/clone';
import Share from '../actions/share';
import React from 'react';

export default class Header extends React.Component {
  render() {
    let button_text = '';
    if (this.props.evaluation_template.id) {
      button_text = I18n.t('training_standards.show_evaluation');
    } else {
      button_text = I18n.t('training_standards.create_evaluation');
    }

    return (
      <div className='col-md-12'>
        <div className='border-btn'>
          <div className='col-md-2'>
            <button className='btn btn-success'
              title={I18n.t('training_standards.assign')}
              onClick={this.onClickButtonAssignSubject.bind(this)}>
              <i className='fa fa-plus'></i>
              {I18n.t('training_standards.assign')}
            </button>
          </div>
          <div className='col-md-2'>
            <button type='button' className='btn btn-success'
              title={I18n.t('training_standards.create_evaluation')}
              onClick={this.showModalEvaluationTemplate.bind(this)}>
              <i className='fa fa-eye'></i> {button_text}
            </button>
          </div>
          <Clone training_standard={this.props.training_standard}
            organization={this.props.organization}
            share_with_organization={this.props.share_with_organization} />
          <Share training_standard={this.props.training_standard}
            organization={this.props.organization}
            standard_organizations={this.props.standard_organizations}
          />
          <div className='col-md-2'>
            <button className='btn btn-success'
              title={I18n.t('training_standards.modals.header_edit')}
              onClick={this.onClickButtonEdit.bind(this)}>
              <i className='fa fa-plus'></i>
              {I18n.t('training_standards.modals.header_edit')}
            </button>
          </div>
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
    $('.modal-edit').modal();
  }
}
