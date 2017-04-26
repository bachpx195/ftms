import _ from 'lodash';
import axios from 'axios';
import React from 'react';
import * as routes from 'config/routes';

require('../../../../assets/sass/show_organization.scss');

export default class ModalAssignOwner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url_programs: this.props.url_programs,
      organization: this.props.organization,
      all_roles: this.props.all_roles,
      owners: this.props.organization.users,
      user_checked: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      organization: nextProps.organization,
      all_roles: nextProps.all_roles
    });
  }

  renderCurrentOwner() {
    if (!_.isEmpty(this.state.organization.owner)) {
      return (
        <h5>
          <strong>{I18n.t("organizations.headers.current_owner")}</strong>
          <img src={this.state.organization.owner.avatar.url}
            className='img-circle' width='30' height='30' />
          {this.state.organization.owner.name}
        </h5>
      )
    }
  }

  render() {
    return (
      <div className="modal fade modal-assign-owner" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">
                {I18n.t("organizations.titles.assign_owner_for")
                  + this.state.organization.name}
              </h4>
            </div>
            <div className="modal-body">
              {this.renderCurrentOwner()}
              <div className='tms-assign-owner'>
                <div className='panel panel-info'>
                  <div className='panel-heading text-center'>
                    {I18n.t('organizations.list_users')}
                  </div>
                  <div className='panel-body'>
                    <input className="form-control search_form"
                      placeholder={I18n.t('organizations.search_user')}
                      onChange={this.filterUsers.bind(this)} />
                    <div className='list-group list-user clearfix'>
                      {this.renderUsers()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary"
                data-dismiss="modal">
                {I18n.t('buttons.cancel')}
              </button>
              <button type="button" className="btn btn-primary"
                onClick={this.handleSubmit.bind(this)}>
                {I18n.t('buttons.save')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  filterUsers(event) {
    let value = event.target.value;
    let owners = '';
    owners = this.state.organization.users.filter(user => {
      return this.isIncludeUser(user, value);
    });
    if (this.state.owners == []) {
      this.setState({
        owners: this.state.organization.users
      });
    } else {
      this.setState({
        owners: owners
      });
    }
  }

  isIncludeUser(user, value) {
    return user.name.toLowerCase().includes(value.toLowerCase());
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

  renderUsers() {
    return this.state.owners.map(user => {
      return (
        <label key={user.id} className='list-group-item cursor'
          onClick={this.handleAfterClick.bind(this, user)} value={user.id}>
          <input type='radio' name='radio' checked={this.state.checked} />
          {user.name}
        </label>
      )
    })
  }

  handleAfterClick(user) {
    this.setState({
      user_checked: user,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.organization.owner.id == null) {
      return;
    }
    let course = _.omit(this.state.organization, 'errors');
    let formData = new FormData();
    formData.append('organization[user_id]', this.state.user_checked.id);
    formData.append('authenticity_token', ReactOnRails.authenticityToken());

    let organization_url = routes.organization_url(this.state.organization.id) +
      '.json';

    axios({
      url: organization_url,
      method: 'PATCH',
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      this.props.handleOwnerAssigned(response.data.owner);
      $('.modal-assign-owner').modal('hide');
    })
    .catch(error => console.log(error));
  }
}
