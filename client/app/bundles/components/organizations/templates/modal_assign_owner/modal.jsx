import _ from 'lodash';
import axios from 'axios';
import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as organization_constants from '../../constants/organization_constants';

const ORGANIZATION_URL = app_constants.APP_NAME + 'organizations';
require('../../../../assets/sass/show_organization.scss');

export default class ModalAssignOwner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url_programs: this.props.url_programs,
      organization: this.props.organization,
      all_roles: this.props.all_roles,
      owners: []
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
              <div className='nht-assign-owner'>
                <label>{I18n.t('courses.roles')}</label>
                <select className='nht-list-roles form-control'
                  onChange={this.handleChangeRole.bind(this)}
                  id='list-roles'>
                  <option value=''>{I18n.t('courses.select_role')}</option>
                  {this.renderOptions(this.state.all_roles)}
                </select>

                <label>{I18n.t('courses.owners')}</label>
                <select className='nht-list-owners form-control'
                  id='list-owners'
                  name='owner_id' onChange={this.handleChange.bind(this)}>
                  <option value=''>{I18n.t('courses.select_owner')}</option>
                  {this.renderOptions(this.state.owners)}
                </select>
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
    let url = app_constants.APP_NAME + organization_constants.FILTER_ROLE_PATH
      + $('#list-roles').val();

    axios.get(url)
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

  handleChange(event) {
    let attribute = event.target.name;
    Object.assign(this.state.organization, {[attribute]: event.target.value});
    this.setState({
      organization: this.state.organization
    });
  }



  handleSubmit(event) {
    event.preventDefault();
    if (this.state.organization.owner_id == null) {
      return;
    }
    let course = _.omit(this.state.organization, 'errors');
    let formData = new FormData();
    formData.append('organization[user_id]', this.state.organization.owner_id);
    formData.append('authenticity_token', ReactOnRails.authenticityToken());

    let url = app_constants.APP_NAME + 'organizations/'
      + this.state.organization.id + '.json';

    axios({
      url: url,
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
