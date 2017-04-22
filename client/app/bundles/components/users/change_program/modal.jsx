import React from 'react';
import axios from 'axios';

import * as app_constants from 'constants/app_constants';

export default class ModalChangeProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_program: this.props.user_program,
      selected_program_id: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user_program: nextProps.user_program,
      selected_program_id: nextProps.selected_program_id,
    });
  }

  render() {
    return (<div className='modal fade modal-change-program' role='dialog'>
      <div className='modal-dialog modal-lg' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <button type='button' className='close' data-dismiss='modal'>
              <span aria-hidden='true'>&times;</span>
            </button>
            <h4 className='modal-title' >
              {I18n.t('users.modal_change_program.title')}
            </h4>
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col-md-5'>
                <div className='panel panel-info'>
                  <div className='panel-heading text-center'>
                    {I18n.t('users.modal_change_program.from')}
                  </div>
                  <div className='panel-body'>
                    <h4>{this.state.user_program.name}</h4>
                  </div>
                </div>
              </div>

              <div className='col-md-2'>
                <i className='fa fa-arrow-right arrow'></i>
              </div>

              <div className='col-md-5'>
                <div className='panel panel-info'>
                  <div className='panel-heading text-center'>
                    {I18n.t('users.modal_change_program.to')}
                  </div>
                  <div className='panel-body'>
                    <select className='form-control'
                      onChange={this.handleSelectChange.bind(this)}>
                      <option>
                        {I18n.t('users.modal_change_program.select_program')}
                      </option>
                      {this.renderOptionProgram()}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' data-dismiss='modal'>
              {I18n.t('buttons.cancel')}
            </button>
            <button type='button' className='btn btn-primary'
              onClick={this.handleSubmit.bind(this)} disabled={!this.formValid()}>
              {I18n.t('buttons.save')}
            </button>
          </div>
        </div>
      </div>
    </div>);
  }

  renderOptionProgram(){
    return this.props.remaining_organization_programs.map(program => {
      return (
        <option key={program.id} value={program.id.toString()}>
          {program.name}
        </option>
      );
    });
  }

  formValid() {
    if(this.state.selected_program_id > 0) {
      return true;
    }
    return false;
  }

  handleSelectChange(event) {
    this.setState({
      selected_program_id: parseInt(event.target.value)
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();

    formData.append('moving_history[user_id]', this.props.user.id);
    formData.append('moving_history[organization_id]',
      this.props.user.user_organization.id);
    formData.append('moving_history[sourceable_id]', this.state.user_program.id);
    formData.append('moving_history[sourceable_type]', 'Program');
    formData.append('moving_history[destinationable_id]',
      this.state.selected_program_id);
    formData.append('moving_history[destinationable_type]', 'Program');
    formData.append('authenticity_token', ReactOnRails.authenticityToken());

    if (confirm(I18n.t('data.confirm_change'))) {
      let url = app_constants.APP_NAME + app_constants.MOVE_USERS_PATH + '.json';
      axios.post(url, formData)
        .then(response => {
          this.props.afterChangeProgram(response.data.user_detail.user_program,
            response.data.user_detail.remaining_organization_programs);
          $('.modal-change-program').modal('hide');
        })
        .catch(error => console.log(error));
    }
  }
}
