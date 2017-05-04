import axios from 'axios';
import React from 'react';
import ReactOnRails from 'react-on-rails';
import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';

require('../../../../assets/sass/program_show.scss');

export default class AssignOwner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_roles: props.all_roles,
      owners: props.owners
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      all_roles: nextProps.all_roles,
      owners: nextProps.owners
    });
  }

  render() {
    return (
      <div className='nht-assign-owner'>
        <div>
          <div className='panel panel-info'>
            <div className='panel-heading text-center'>
              {I18n.t('courses.owners')}
            </div>
            <div className='panel-body'>
              <select className='nht-list-roles form-control'
                onChange={this.handleChangeRole.bind(this)} id='list-roles'>
                <option value=''>{I18n.t('courses.select_owner_role')}</option>
                {this.renderOptions(this.state.all_roles)}
              </select>
              <br/>
              <label>{I18n.t('organizations.list_users')}</label>
              <input className="form-control search_form"
                placeholder={I18n.t('organizations.search_user')}
                onChange={this.filterOwners.bind(this)} />
              <div className='list-group list-user clearfix'>
                {this.renderOwners()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  isIncludeOwners(owner, value) {
    return owner.name.toLowerCase().includes(value.toLowerCase());
  }

  filterOwners(event) {
    let value = event.target.value;
    let owners = '';
    owners = this.state.owners
      .filter(owner => {
      return this.isIncludeOwners(owner, value);
    });
    if (value == "") {
      this.setState({
        owners: this.props.owners
      });
    } else {
      this.setState({
        owners: owners
      });
    }
  }

  renderOptions(objects) {
    if (objects) {
      return objects.map(object => {
        return <option key={object.id}
          value={object.id}>{object.name}</option>;
      });
    }
    return null;
  }

  handleChangeRole(event) {
    let role_url = routes.filter_role_url($('#list-roles').val());
    axios.get(role_url)
      .then(response => {
        this.setState({
          owners: response.data.owners
        });
      })
      .catch(error => {
          console.log(error);
        }
      );
  }

  renderOwners() {
    return this.state.owners.map(owner => {
      return (
        <label key={owner.id} className='list-group-item cursor'
          value={owner.id} >
          <input type='radio' name='radio' key={owner.id}
            value={owner.id} />
          {owner.name}
        </label>
      )
    })
  }
}
