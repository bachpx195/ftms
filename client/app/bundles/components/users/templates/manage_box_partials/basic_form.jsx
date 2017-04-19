import axios from 'axios';
import Create from '../../actions/create';
import Errors from '../../../shareds/errors';
import React from 'react';
import ReactOnRails from 'react-on-rails';
import Update from '../../actions/update';
import * as app_constants from 'constants/app_constants';

export default class BasicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user || {name: '', email: ''},
      profile: props.profile || {
        university_id: '', graduation: '', working_day: 0
      },
      errors: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: this.state.user,
      profile: this.state.profile,
      errors: null,
    });
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

  render() {
    return(
      <form role='form'>
        <Errors errors={this.state.errors} />
        <div className='col-md-3'></div>
        <div className='col-md-6'>
          <div className='basic-form box'>
            <div className='form-group clearfix'>
              <label htmlFor='name' className='col-sm-4 control-label'>
                {I18n.t('users.name')}
              </label>
              <div className='col-sm-8'>
                <div className='input-group'>
                  <span className='input-group-addon'>
                    <i className='fa fa-user'></i>
                  </span>
                  <input id='name' className='form-control' type='text' name='name'
                    value={this.state.user.name}
                    onChange={this.handleUserChange.bind(this)}/>
                </div>
              </div>
            </div>
            <div className='form-group clearfix'>
              <label htmlFor='email' className='col-sm-4 control-label'>
                {I18n.t('users.email')}
              </label>
              <div className='col-sm-8'>
                <div className='input-group'>
                  <span className='input-group-addon'>
                    <i className='fa fa-envelope'></i>
                  </span>
                  <input id='email' className='form-control' type='email'
                    name='email' onChange={this.handleUserChange.bind(this)}
                    value={this.state.user.email}/>
                </div>
              </div>
            </div>
            <div className='form-group clearfix'>
              <label htmlFor='password' className='col-sm-4 control-label'>
                {I18n.t('users.profile_detail.password')}
              </label>
              <div className='col-sm-8'>
                <input id='password' className='form-control' type='password'
                  name='password' onChange={this.handleUserChange.bind(this)}
                />
              </div>
            </div>
            <div className='form-group clearfix'>
              <label htmlFor='password-confirmation' className='col-sm-4 control-label'>
                {I18n.t('users.profile_detail.password_confirmation')}
              </label>
              <div className='col-sm-8'>
                <input id='password-confirmation' className='form-control' type='password'
                  name='password_confirmation' onChange={this.handleUserChange.bind(this)}
                />
              </div>
            </div>
            <div className='form-group clearfix'>
              <label htmlFor='university' className='col-sm-4 control-label'>
                {I18n.t('users.profile_detail.university')}
              </label>
              <div className='col-sm-8'>
                <select id='University' className='form-control'
                  name='university_id'
                  onChange={this.handleProfileChange.bind(this)}
                  value={this.state.profile.university_id || ''}>
                  <option value=''>-- {I18n.t('users.form_select.select_university')}</option>
                  {this.renderOptions(this.props.universities)}
                </select>
              </div>
            </div>
            <div className='form-group clearfix'>
              <label htmlFor='graduation' className='col-sm-4 control-label'>
                {I18n.t('users.profile_detail.graduation')}
              </label>
              <div className='col-sm-8'>
                <input type='date' className='form-control' id='graduation'
                  name='graduation'
                  value={this.state.profile.graduation || ''}
                  onChange={this.handleProfileChange.bind(this)} />
              </div>
            </div>
            <div className='form-group clearfix'>
              <label htmlFor='working-day' className='col-sm-4 control-label'>
                {I18n.t('users.profile_detail.working_day')}
              </label>
              <div className='col-sm-8'>
                <input type='number' min='0' id='working-day' className='form-control'
                  name='working_day'
                  value={this.state.profile.working_day || 0}
                  onChange={this.handleProfileChange.bind(this)}  />
              </div>
            </div>
            <div className='form-group'>
              <div className='text-right'>
                <Update
                  state={this.state} url={this.props.url}
                  organization={this.props.organization}
                  handleErrors={this.handleErrors.bind(this)} />
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-3'></div>
      </form>
    )
  }

  handleUserChange(event) {
    let attribute = event.target.name;
    Object.assign(this.state.user, {[attribute]: event.target.value});
    this.setState({user: this.state.user});
  }

  handleProfileChange(event) {
    let attribute = event.target.name;
    Object.assign(this.state.profile, {[attribute]: event.target.value});
    this.setState({profile: this.state.profile});
  }

  handleErrors(errors) {
    this.setState({errors: errors});
  }
}
