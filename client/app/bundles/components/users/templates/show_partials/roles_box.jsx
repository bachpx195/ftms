import axios from 'axios';
import * as routes from 'config/routes';
import FormEditRole from './form_edit_role';
import CustomPolicy from 'policy/course_policy';
import React from 'react';
import UserPolicy from 'policy/user_policy';

export default class RolesBox extends React.Component {
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
    if (this.props.user == undefined) {
      user = JSON.parse(localStorage.getItem('current_user'));
    } else {
      user = this.props.user;
    }

    this.setState({
     user: user
    })
    axios.get(routes.change_role_user_url(user.id) +'.json')
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
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{title}</h4>
            </div>
            <div className='modal-body user-roles'>
              <FormEditRole all_roles={this.state.all_roles}
                functions={this.state.functions}
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
      <UserPolicy permit={[
        {action: ['ownerByIds'], data: {ids:
          [this.props.organization.user_id, this.props.program.owner_id]}},
        {controller: 'update_all_roles', action: ['update']},
        {controller: 'users', action: ['update', 'correctUser'], data: {id: this.props.user.id}}
      ]}>
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
      </UserPolicy>
    )
  }

  handleEdit() {
    let $target = $(event.target);
    $target.blur();
    $('#modalRole').modal();
    this.fetchRoles();
  }
}
