import Form from './form';
import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as subject_constants from '../../subjects/constants/subject_constants';

const SUBJECT_URL = app_constants.APP_NAME + subject_constants.SUBJECT_PATH;

export default class Modal extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      project: {},
    }
  }
  
  render() {
    let url = SUBJECT_URL + this.props.subject_detail.id + '/projects';
    return (
      <div className='modal-create modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>
                &times;
              </button>
              <h4 className='modal-title'>
                {I18n.t('projects.modals.manage_project')}
              </h4>
            </div>
            <div className='modal-body clearfix'>
              <Form organizations={this.props.organizations}
                url={url}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
