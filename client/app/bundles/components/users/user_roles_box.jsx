import React from 'react';
import axios from 'axios';
import * as app_constants from 'constants/app_constants';
import * as user_constants from './user_constants';
import FormEditRole from './form_edit_role';

require('../sass/user.css.scss');

const ROLES_URL = app_constants.APP_NAME + 'change_role/' + user_constants.USER_PATH;
const USER_FUNCTION_URL = app_constants.APP_NAME + user_constants.USER_FUNCTION_PATH;

export default class UserRolesBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      roles: [],
      all_roles: [],
      functions: []
    }
  }

  fetchRoles() {
    axios.get(ROLES_URL + this.props.user.id +'.json')
    .then(response => {
      this.setState({
        roles: response.data.roles,
        all_roles: response.data.all_roles,
        functions: response.data.functions
      })
    })
    .catch(error => {
      console.log(error)
    });
  }

  renderModal(){
    let title = '';
    title = I18n.t('users.edit_user_role');
    return (
      <div id='modalRole' className='modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{title}</h4>
            </div>
            <div className='modal-body user-roles'>
              <FormEditRole all_roles={this.state.all_roles} functions={this.state.functions}
                current_roles={this.state.roles} user_id={this.props.user.id}
                handleAfterSaved={this.handleAfterUpdated.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterUpdated(new_roles) {
    this.setState({
      roles: new_roles
    })
  }

  renderRole() {
    return _.map(this.state.roles, role => {
      return(
        <p key={role.id} className='form-group'>{role.name}</p>
      )
    })
  }

  render() {
    return(
      <div>
        <div>
          <h1>{I18n.t('users.roles.name')}</h1> 
          <div>{this.renderRole()}</div>
        </div>
        <div className='btn btn-primary' onClick={this.handleEdit.bind(this)}>
          {I18n.t('users.buttons.edit_role')}
        </div>
        {this.renderModal()}
      </div>
    )
  }

  handleEdit() {
    let $target = $(event.target);
    $target.blur();
    $('#modalRole').modal();
    this.fetchRoles();
  }
}
