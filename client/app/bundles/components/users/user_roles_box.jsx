import React from 'react';
import axios from 'axios';
import * as app_constants from 'constants/app_constants';
import * as user_constants from './user_constants';
import FormEditRole from './form_edit_role';
import CustomPolicy from 'policy/course_policy';

const ROLES_URL = app_constants.APP_NAME + 'change_role/' + user_constants.USER_PATH;
const USER_FUNCTION_URL = app_constants.APP_NAME + user_constants.USER_FUNCTION_PATH;

export default class UserRolesBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      roles: [],
      all_roles: [],
      functions: []
    }
  }

  fetchRoles() {
    let user = '';
    if(this.props.user == undefined){
      user = JSON.parse(localStorage.getItem('current_user'));
    } else {
      user = this.props.user;
    }

    this.setState({
     user: user
    })
    axios.get(ROLES_URL + user.id +'.json')
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
                current_roles={this.state.roles} user_id={this.state.user.id}
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
        <div key={role.id} >{role.name}</div>
      )
    })
  }

  render() {
    return(
      <CustomPolicy permit={[{controller: 'users', action: ['index'], target: 'children'},
        {action: ['setOwner'], target: 'children', data: {organization_ids:
        this.state.organization_ids}}]} >
        <div className='text-center roles-box'>
          <span>
            <strong>{I18n.t('users.roles.name')}: </strong>
            {this.renderRole()}
          </span>
          <div className='btn btn-primary' onClick={this.handleEdit.bind(this)}>
            {I18n.t('users.buttons.edit_role')}
          </div>
          {this.renderModal()}
        </div>
      </CustomPolicy>
    )
  }

  handleEdit() {
    let $target = $(event.target);
    $target.blur();
    $('#modalRole').modal();
    this.fetchRoles();
  }
}
