import axios from 'axios';
import Form from '../templates/form';
import React from 'react';
import * as app_constants from 'constants/app_constants';

const POLICIES = app_constants.POLICIES;

export default class ModalCreateStandard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props,
      policy: POLICIES[0].id,
    }
  }

  render() {
    return (
      <div className='modal-create-standards modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>
                {I18n.t('training_standards.create')}
              </h4>
            </div>
            <div className='modal-body'>
              <form onSubmit={this.handleSubmitCreateStandard.bind(this)}>
                <div className='form-group row'>
                  <lable className='col-md-2'>
                    {I18n.t('training_standards.headers.name')}
                  </lable>
                  <div className='col-md-10'>
                    <input type='text' placeholder={I18n.t('training_standards.headers.name')}
                      className='form-control' name='name' ref='nameField' />
                  </div>
                </div>

                <div className='form-group row'>
                  <lable className='col-md-2'>
                    {I18n.t('training_standards.headers.policy')}
                  </lable>
                  <div className='col-md-10'>
                    <select className='form-control' ref='policyField'
                      value={this.state.policy} name='policy'
                      onChange={this.handleChange.bind(this)}>
                      {this.renderOptions(POLICIES)}
                    </select>
                  </div>
                </div>
                <div className='form-group'>
                  <div className='text-center'>
                    <button type='submit' className='btn btn-primary'>
                      <i className='fa fa-floppy-o'></i>
                      &nbsp;{I18n.t('buttons.save')}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleSubmitCreateStandard(event) {
    event.preventDefault();
    if (confirm(I18n.t('data.confirm_all'))) {
      axios.post(this.props.standard_url, {
        training_standard: {
          organization_id: this.props.organization ? this.props.organization.id : '',
          policy: this.refs.policyField.value,
          name: this.refs.nameField.value
        }, authenticity_token: ReactOnRails.authenticityToken()
      }, app_constants.AXIOS_CONFIG)
        .then(response => {
          let {training_standard} = response.data;
          this.props.handleAfterCreatedStandard(training_standard)
          $('.modal-create-standards').modal('hide');
          this.refs.nameField.value = ''
          window.location.href = this.props.standard_url + '/' + training_standard.id;
        })
        .catch(error => {
          console.log(error);
      });
    }
  }

  handleChange(event) {
    let attribute = event.target.name;
    this.setState({
      [attribute]: event.target.value
    });
  }

  renderOptions(objects) {
    if (objects) {
      return objects.map(object => {
        return (
          <option key={object.id} value={object.id}>
            {object.name}
          </option>);
      });
    }
    return null;
  }
}
