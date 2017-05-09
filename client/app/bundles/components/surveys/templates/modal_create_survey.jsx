import React from 'react';
import * as app_constants from 'constants/app_constants';
import FormCreateSurvey from '../actions/create';


export default class ModalCreateSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta_types: props.meta_types,
      meta_types_checked: []
    }
  }

  render() {
    return (
      <div className='modal fade in modal-create-survey' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content clearfix'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>
                {I18n.t('surveys.create_survey')}
              </h4>
            </div>

            <div className='modal-task'>
              <div className='modal-body'>
                <FormCreateSurvey
                  url={this.props.url}
                  subject_detail={this.props.subject_detail}
                  meta_types={this.state.meta_types}
                  meta_types_checked={this.state.meta_types_checked}
                  ownerable_id={this.props.ownerable_id}
                  ownerable_type={this.props.ownerable_type}
                  type='Survey'
                  subject={this.props.subject}
                  handleAfterCreatedSurvey={this.props.handleAfterCreatedSurvey}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
