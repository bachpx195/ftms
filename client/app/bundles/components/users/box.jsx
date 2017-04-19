import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as user_constants from './user_constants';
import Users from './users';

export default class UsersBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
      organizations: props.organizations,
      view_type: 'list'
    }
  }

  render() {
    const NEW_USER_URL = app_constants.APP_NAME + user_constants.ORGANIZATION_PATH
      + this.props.organization.id + '/' + user_constants.USER_PATH
      + user_constants.NEW_PATH;

    const ChangeView = () => {
      if (this.state.view_type == 'list') {
        return (
          <button type='button' className='btn btn-box-tool'
            data-widget='collapse' onClick={this.handleChangeView.bind(this)}
            title={I18n.t('users.view_type.grid')}>
            <i className='fa fa-th' aria-hidden='true'></i>
          </button>
        );
      } else {
        return (
          <button type='button' className='btn btn-box-tool'
            data-widget='collapse' onClick={this.handleChangeView.bind(this)}
            title={I18n.t('users.view_type.list')}>
            <i className='fa fa-list' aria-hidden='true'></i>
          </button>
        );
      }
    }

    const View = () => {
      if (this.state.view_type == 'list') {
        return (
          <div className='box-body'>
            <a className='btn btn-primary button-new'
              href={NEW_USER_URL}>
              {I18n.t('users.buttons.new')}
            </a>
            <Users users={this.state.users} />
          </div>
        );
      } else {
        return (
          <div className='box-body'>

          </div>
        );
      }
    }

    return(
      <div className='row'>
        <div className='col-md-12'>
          <div className='box box-success'>

            <div className='box-header with-border'>
              <h3 className='box-title'>{I18n.t('users.users')}</h3>
              <div className='box-tools pull-right'>
                <ChangeView />
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

            <View />
          </div>
        </div>
      </div>
    );
  }

  handleChangeView(event) {
    event.preventDefault();
    if (this.state.view_type == 'list') {
      this.setState({ view_type: 'grid' });
    } else {
      this.setState({ view_type: 'list' });
    }
  }
}
