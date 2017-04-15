import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as user_constants from './user_constants';
import Form from './templates/form';

require('../../assets/sass/user.scss');

export default class UserFormBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const ORGANIZATION_USER_URL = app_constants.APP_NAME + user_constants.ORGANIZATION_PATH
      + this.props.organization.id + '/' + user_constants.USER_PATH;
    let title = '';
    let profile = null;
    if(this.props.user) {
      title = I18n.t('users.box_title.edit_info') + ': ' + this.props.user.name;
    }else {
      title = I18n.t('users.box_title.new_user');
    }

    return(
      <div className='row'>
        <div className='col-md-12'>
          <div className='box box-success'>

            <div className='box-header with-border'>
              <h3 className='box-title'>{title}</h3>
              <div className='box-tools pull-right'>
                <button type='button' className='btn btn-box-tool'
                  data-widget='collapse'>
                  <i className='fa fa-minus'></i>
                </button>
                <button type='button' className='btn btn-box-tool'
                  data-widget='remove'>
                  <i className='fa fa-times'></i>
                </button>
              </div>
            </div>

            <div className='box-body no-padding row'>
              <Form
                url={ORGANIZATION_USER_URL} organization={this.props.organization}
                universities={this.props.universities}
                trainee_types={this.props.trainee_types}
                trainers={this.props.trainers} user={this.props.user}
                stage={this.props.stage} profile={this.props.profile}
                organization_programs={this.props.organization_programs}
                languages={this.props.languages}
                stages={this.props.stages}
                user_statuses={this.props.user_statuses}
              />
            </div>

          </div>
        </div>
      </div>
    );
  }
}
