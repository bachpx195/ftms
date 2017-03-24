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
      <div className="role-detail modal fade">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">{I18n.t("edit_role.edit")}</h4>
            </div>
            <div className="modal-body">
              <div className="role-name form-inline">
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
    var data = nextProps.functions;
    for(var value of data){
      if(value.role_func_id){
        value.checked = true;
        value.default_checked = true;
      }
      else{
        value.checked = false;
        value.default_checked = false;
      }
    }
    this.setState({functions: data, role: nextProps.role, name: nextProps.role.name});
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
    var data = {};
    var functions = [];
    for(var value of this.state.functions){
      if(value.is_changed)
        functions.push({id: value.role_func_id, function_id: value.id,
          user_id: value.user_id, _destroy: value.checked ? 0 : 1});
    }
    data['role_functions_attributes'] = functions;
    data['authenticity_token'] = ReactOnRails.authenticityToken();
    axios.patch(ROLE_FUNCTION_URL + '/' + this.state.role.id, data)
      .then(response => {
        var data = response.data.functions;
        for(var value of data){
          if(value.role_func_id){
            value.checked = true;
            value.default_checked = true;
          }
          else{
            value.checked = false;
            value.default_checked = false;
          }
        }
        this.setState({functions: data, role: response.data.role, name: response.data.role.name});
        this.props.updateRoleDiagram(response.data.role);
      })
      .catch(error => {
        console.log(error);
      });
    localStorage.setItem('role_checkbox', '{}');
  }
}
