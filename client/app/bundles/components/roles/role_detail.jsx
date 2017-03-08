import React from 'react';
import RoleFunctions from './role_functions';
import axios from 'axios';
import * as app_constants from 'constants/app_constants';
import * as role_constants from './role_constants'

const ROLE_FUNCTION_URL = app_constants.APP_NAME + role_constants.ROLE_FUNCTION_PATH;

export default class RoleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      functions: props.functions,
      role: props.role,
      name: props.role.name
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
                  value={this.state.name || ''}
                  onChange={this.handleChange.bind(this)}
                  className='form-control'/>
              </div>
              <RoleFunctions functions={this.state.functions}/>
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
    this.setState({functions: nextProps.functions, role: nextProps.role, name: nextProps.role.name});
  }

  cancel_button(event){
    event.preventDefault();
    localStorage.setItem('role_checkbox', '{}');
  }

  handleChange(event){
    this.setState({
      name: event.target.value
    });
  }

  save_button(){
    var dataRole = {};
    dataRole['role_id'] = this.state.role.id;
    dataRole['name'] = this.state.name;
    dataRole['authenticity_token'] = ReactOnRails.authenticityToken();
    var rel_func = [];
    var functions = this.state.functions;
    var role_checkbox = JSON.parse(localStorage.getItem('role_checkbox'));
    $.each(role_checkbox, function (key, value) {
      var function_id = functions[key].id;
      var role_func_id = functions[key].role_func_id;
      value = (value == true) ? 0: 1;
      rel_func.push({id: role_func_id, role_id: dataRole['role_id'], function_id: function_id, _destroy: value});
    });
    dataRole['role_functions_attributes'] = rel_func;
    axios.patch(ROLE_FUNCTION_URL + '/' + dataRole['role_id'], dataRole)
      .then(response => {
        console.log('Update successed');
        this.setState({functions: response.data.functions});
        this.props.updateRoleDiagram(response.data.role);
      })
      .catch(error => {
        console.log(error);
      });
    localStorage.setItem('role_checkbox', '{}');
  }
}
