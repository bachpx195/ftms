import axios from "axios";
import React from 'react';
import * as routes from 'config/routes';
import Users from './users';
import OrganizationChart from './templates/organization_charts/box';

export default class UsersBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
      organizations: props.organizations,
      view_type: 'list',
      organization_chart: null
    }
  }

  render() {
    const ChangeView = () => {
      if (this.state.view_type == 'list') {
        return (
          <button type='button' className='btn btn-box-tool'
            onClick={this.handleChangeView.bind(this,
              routes.organization_users_url(this.props.organization.id))}
            title={I18n.t('users.view_type.grid')}>
            <i className='fa fa-th' aria-hidden='true'></i>
          </button>
        );
      } else {
        return (
          <button type='button' className='btn btn-box-tool'
            onClick={this.handleChangeView.bind(this,
              routes.organization_users_url(this.props.organization.id))}
            title={I18n.t('users.view_type.list')}>
            <i className='fa fa-list' aria-hidden='true'></i>
          </button>
        );
      }
    }

    const View = () => {
      if (this.state.view_type == 'list') {
        return (
          <div>
            <div className='text-right'>
              <a className='btn btn-primary'
                href={routes.new_organization_user_url(this.props.organization.id)}>
                {I18n.t('users.buttons.new')}
              </a>
            </div>
            <Users users={this.state.users} />
          </div>
        );
      } else {
        return (
          <div className='box-body'>
            <OrganizationChart data={this.state.organization_chart} />
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

  handleChangeView(url, event) {
    event.preventDefault();
    if (this.state.view_type == 'list') {
      if (this.state.organization_chart == null) {
        axios.get(url + '.json')
        .then(response => {
          this.setState({
            organization_chart: response.data.organization,
            view_type: 'grid'
          })
        })
        .catch(error => {
          console.log(error);
        })
      } else {
        this.setState({ view_type: 'grid' });
      }
    } else {
      this.setState({ view_type: 'list' });
    }
  }
}
