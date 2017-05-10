import axios from 'axios';
import React from 'react';
import ReactOnRails from 'react-on-rails';
import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';

require('../../../../assets/sass/program_show.scss');

export default class AssignOwner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      all_roles: props.all_roles,
      owners: props.owners,
      course: props.course,
      selected_role: props.selected_role,
      owner_name: props.owner_name
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      all_roles: nextProps.all_roles,
      owners: nextProps.owners,
      course: nextProps.course,
      selected_role: nextProps.selected_role,
      owner_name: nextProps.owner_name
    });
  }

  render() {
    return (
      <fieldset>
        <div className='nht-assign-owner'>
          <div>
            <div className='panel panel-info'>
              <div className='panel-heading text-center'>
                {I18n.t('courses.owners')}
              </div>
              <div className='panel-body'>
                <select className='nht-list-roles form-control select'
                  value={this.state.selected_role || ''}
                  onChange={this.handleChangeRole.bind(this)} id='list-roles'>
                  <option value=''>{I18n.t('courses.select_owner_role')}</option>
                  {this.renderOptions(this.state.all_roles)}
                </select>
                <br/>
                <label>{I18n.t('organizations.list_users')}</label>
                <input className='form-control search_form'
                  placeholder={I18n.t('organizations.search_user')}
                  onChange={this.filterOwners.bind(this)}
                  value={this.state.owner_name}/>
                <div className='list-group list-user clearfix'>
                  {this.renderOwners()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='text-center col-md-12'>
          <input type='button' name='cancel' className='cancel action-button'
            value={I18n.t('programs.button.cancel')}
            onClick={this.props.onCancelForm}/>
          <input type='button' name='next' className='next action-button'
            value={I18n.t('programs.button.previous')}
            onClick={this.props.onClickPrevious}/>
          <input type='button' name='submit' className='submit action-button'
            value={I18n.t('programs.button.submit')}
            onClick={this.props.handleSubmit} />
        </div>
      </fieldset>
    );
  }

  isIncludeOwners(owner, value) {
    return owner.name.toLowerCase().includes(value.toLowerCase());
  }

  filterOwners(event) {
    let value = event.target.value;
    let owners = '';
    owners = this.state.owners
      .filter(owner => {
      return this.isIncludeOwners(owner, value);
    });
    if (value == '') {
      this.setState({
        owners: this.props.owners
      });
    } else {
      this.setState({
        owners: owners
      });
    }
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

  handleChangeRole(event) {
    let value = $('#list-roles').val()
    let role_url = routes.filter_role_url(value);
    axios.get(role_url)
      .then(response => {
        this.setState({
          selected_role: value,
          owners: response.data.owners
        });

      })
      .catch(error => {
          console.log(error);
        }
      );
  }

  renderOwners() {
    return this.state.owners.map(owner => {
      return (
        <label key={owner.id} className='list-group-item cursor'
          value={owner.id} >
          <input type='radio' name='radio' key={owner.id} data-name={owner.name}
            value={owner.id} onChange={this.onClickOwner.bind(this)} />
          {owner.name}
        </label>
      )
    })
  }

  onClickOwner(event) {
    let value = event.target.value;
    let owner_name = $(event.target).data('name');
    this.setState({
      owner_name: owner_name
    })
    Object.assign(this.state.course, {owner_id: value});
    this.props.afterInputFormAssignOwner(this.state.course,
      this.state.selected_role, owner_name);
  }
}
