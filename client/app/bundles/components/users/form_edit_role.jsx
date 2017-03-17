import React from 'react';
import lodash from 'lodash';
import ReactOnRails from 'react-on-rails';
import axios from 'axios';
import Errors from '../shareds/errors';
import CheckRoleBox from './check_role_box';
import UserFunctionBox from './user_function_box';
import * as app_constants from 'constants/app_constants';
import * as user_constants from './user_constants';

const ROLES_URL = app_constants.APP_NAME + 'change_role/' + user_constants.USER_PATH;

export default class FormEditRole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_roles: props.current_roles,
      all_roles: props.all_roles,
      functions: props.functions
    }
  }

  componentWillReceiveProps(nextProps) {
    var data = nextProps.functions;
    for(var value of data){
      if(value.user_func_id){
        value.checked = true;
        value.default_checked = true;
      }
      else{
        value.checked = false;
        value.default_checked = false;
      }
    }
    this.setState({
      current_roles: nextProps.current_roles,
      all_roles: nextProps.all_roles,
      functions: data
    })
  }

  renderAllRole() {
    return _.map(this.state.all_roles, role => {
      var ch = this.handleCheck(role);
      return(
        <div key={role.id}>
          <div className='checkbox'>
            <CheckRoleBox role={role} handleCheck={this.handleAfterCheck.bind(this)}
              is_checked={ch}/>
            <p>{role.name}</p>
          </div>
        </div>
      )
    });
  }

  handleAfterCheck(current_role, is_checked) {
    if(is_checked) {
      this.state.current_roles.push(current_role);
    } else {
      _.remove(this.state.current_roles, role => {
        return current_role.id == role.id;
      });
    }
    this.setState({
      current_roles: this.state.current_roles
    });
    this.updateUserFunction(this.state.current_roles, this.props.user_id);
  }

  handleCheck(role) {
    let index = this.state.current_roles.findIndex(_role => {
      return role.id == _role.id
    })
    return index >= 0;
  }

  render() {
    return(
      <div className='edit-role'>
        <div className='roles'>{this.renderAllRole()}</div>
        <UserFunctionBox user_id={this.props.user_id} data={this.state.functions} dataChange={this.dataChange.bind(this)}/>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <div className="text-right">
              <button type="submit" className="btn btn-primary">
                {I18n.t("users.buttons.save")}
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  dataChange(functions){
    this.setState({functions: functions})
  }

  handleSubmit(event) {
    event.preventDefault();
    var data = {};
    var functions = [];
    for(var value of this.state.functions){
      if(value.checked)
        functions.push({function_id: value.id, _destroy: 0});
    }
    data['user_functions_attributes'] = functions;
    axios.patch(ROLES_URL + this.props.user_id, {
      roles: this.state.current_roles,
      functions: data,
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      $('#modalRole').modal('hide');
      this.props.handleAfterSaved(response.data.roles);
    })
    .catch(error => {
      console.log(error);
    });
  }

  updateUserFunction(current_roles, user_id){
    axios.patch(ROLES_URL + this.props.user_id + '.json', {
      update_show: "update_show",
      roles: current_roles,
      authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      var data = response.data.functions;
      for(var value of data){
        if(value.user_func_id){
          value.checked = true;
          value.default_checked = true;
        }
        else{
          value.checked = false;
          value.default_checked = false;
        }
      }
      this.setState({functions: data});
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }
}
