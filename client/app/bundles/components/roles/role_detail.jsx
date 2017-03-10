import React from 'react';
import RoleFunctions from './role_functions';
import axios from 'axios';
import * as app_constants from 'constants/app_constants';
import * as role_constants from './role_constants'

const ROLE_FUNCTION_URL = app_constants.APP_NAME + role_constants.ROLE_FUNCTION_PATH;

export default class RoleDetail extends React.Component {
  constructor(props) {
    super(props);
    var role = props.dataRole.role || {name: ''};
    this.state = ({
      dataRole: props.dataRole,
      name: role.name
    });
  }

  render() {
    return (
      <div id="role_detail" className="modal fade">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">{I18n.t("edit_role.edit")}</h4>
            </div>
            <div className="modal-body">
              <div className="role_name form-inline">
                <label>{I18n.t("edit_role.name")}: </label>
                <input type='text' placeholder={I18n.t('edit_role.name')}
                  value={this.state.name} ref='nameField'
                  onChange={this.handleChange.bind(this)}
                  className='form-control' name='name'/>
              </div>
              <RoleFunctions dataRole={this.state.dataRole}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal"
                onClick={this.cancel_button.bind(this)}>{I18n.t("buttons.close")}</button>
              <button type="button" className="btn btn-primary"
                onClick={this.save_button.bind(this)}>{I18n.t("buttons.save")}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps){
    this.setState({dataRole: nextProps.dataRole, name: nextProps.dataRole.role.name});
  }

  cancel_button(event){
    event.preventDefault();
    localStorage.setItem('role_checkbox', '{}');
  }

  handleChange(event){
    let attribute = event.target.name;
    this.setState({
      [attribute]: event.target.value
    });
  }

  save_button(){
    var dataRole ={};
    dataRole['role_id'] = this.state.dataRole.role.id;
    dataRole['name'] = this.state.name;
    dataRole['authenticity_token'] = ReactOnRails.authenticityToken();
    var rel_func = [];
    var props = this.state.dataRole;
    var role_checkbox = JSON.parse(localStorage.getItem('role_checkbox'));
    $.each(role_checkbox, function (key, value) {
      var function_id = props.functions[key].id;
      var role_func_id = props.functions[key].role_func_id;
      value = (value == true) ? 0: 1;
      rel_func.push({id: role_func_id, role_id: dataRole['role_id'], function_id: function_id, _destroy: value});
    });
    dataRole['role_functions_attributes'] = rel_func;
    axios.patch(ROLE_FUNCTION_URL + '/' + dataRole['role_id'], dataRole)
      .then(response => {
        console.log('Update successed');
        this.setState({dataRole: response.data});
      });
    localStorage.setItem('role_checkbox', '{}');
  }
}
