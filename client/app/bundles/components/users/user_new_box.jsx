import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as user_constants from './user_constants';
import UserForm from './user_form';

require('../../assets/sass/user.scss');

export default class UserNewBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const NEW_USER_URL = app_constants.APP_NAME + user_constants.ORGANIZATION_PATH
      + this.props.organization.id + '/' + user_constants.USER_PATH;
    return(
      <div className='row'>
        <div className='col-md-12'>
          <div className='box box-success'>

            <div className='box-header with-border'>
              <h3 className='box-title'>{I18n.t('users.box_title.new_user')}</h3>
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
              <UserForm
                url={NEW_USER_URL} organization={this.props.organization}
                universities={this.props.universities}
                trainee_types={this.props.trainee_types}
                trainers={this.props.trainers}
                stage={this.props.stage}
                organization_programs={this.props.organization_programs}
                languages={this.props.languages}
                user_statuses={this.props.user_statuses}
              />
            </div>

          </div>
        </div>
      </div>
    );
  }
}
