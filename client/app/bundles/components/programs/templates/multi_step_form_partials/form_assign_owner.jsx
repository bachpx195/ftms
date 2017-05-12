import axios from 'axios';
import Errors from 'shared/errors';
import ListUsers from '../../../courses/modal_assign_member/list_users';
import React from 'react';
import ReactOnRails from 'react-on-rails';
import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';

require('../../../../assets/sass/program_show.scss');

export default class AssignOwner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unassigned_users: props.program_detail.users,
      managers: props.managers || [],
      members: props.members || [],
      owner_id: props.course.owner_id || '',
      checked_users: [],
      checked_managers: [],
      checked_members: [],
      errors: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    let assigned_users = [...nextProps.managers, ...nextProps.members];
    let unassigned_users = nextProps.program_detail.users;
    unassigned_users = unassigned_users.filter(user => {
      return !assigned_users.includes(user);
    });
    this.setState({
      unassigned_users: unassigned_users,
      managers: nextProps.managers,
      members: nextProps.members,
      course: nextProps.course,
      checked_users: [],
      checked_managers: [],
      checked_members: [],
      errors: null,
    });
  }


  render() {
    return (
      <fieldset>
        <Errors errors={this.state.errors} />
        <div className='row ms-modal-assign-member'>
          <div className='col-md-5'>
            <ListUsers title={I18n.t('courses.labels.list_users')}
              className='list-users' users={this.state.unassigned_users || ''}
              checkedUsers={this.state.checked_users}
              handleClickUser={this.handleClickUser.bind(this)} />
          </div>

          <div className='col-md-2 text-center'>
            <div className='form-group'>
              <label><strong>{I18n.t('courses.owner.title')}</strong></label>
              <select className='form-control select' name='owner_id'
                onChange={this.handleOwnerChange.bind(this)}
                value={this.state.owner_id || ''}>
                <option value=''>{I18n.t('courses.select_owner')}</option>
                {this.renderOptions(this.props.program_detail.users)}
              </select>
            </div>
            <button type='button'
              className='btn btn-success center-block assign-managers'
              onClick={this.assignManagers.bind(this)}>
              <i className='fa fa-angle-double-right' aria-hidden='true'></i>
              {I18n.t('courses.labels.manager')}
            </button>
            <button type='button'
              className='btn btn-danger center-block reject-users'
              onClick={this.rejectUsers.bind(this)}>
              <i className='fa fa-angle-double-left' aria-hidden='true'></i>
              {I18n.t('courses.labels.reject')}
            </button>
            <button type='button'
              className='btn btn-success center-block assign-members'
              onClick={this.assignMembers.bind(this)}>
              <i className='fa fa-angle-double-right' aria-hidden='true'></i>
              {I18n.t('courses.labels.member')}
            </button>
          </div>

          <div className='col-md-5'>
            <ListUsers title={I18n.t('courses.labels.list_managers')}
              className='list-managers' users={this.state.managers}
              checkedUsers={this.state.checked_managers}
              handleClickUser={this.handleClickManager.bind(this)} />
            <ListUsers title={I18n.t('courses.labels.list_members')}
              className='list-members' users={this.state.members}
              checkedUsers={this.state.checked_members}
              handleClickUser={this.handleClickMember.bind(this)} />
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
            onClick={this.handleSubmit.bind(this)} />
        </div>
      </fieldset>
    );
  }

  handleSubmit(event) {
    if (this.state.owner_id == '') {
      this.setState({
        errors: I18n.t('courses.errors.no_owner')
      });
    } else {
      this.props.handleSubmit(event);
    }
  }

  handleOwnerChange(event) {
    this.setState({
      owner_id: event.target.value,
    });
    this.props.handleOwnerChange(event.target.value);
  }

  handleClickUser(user, checked) {
    if (checked) {
      _.remove(this.state.checked_users, checked_user => {
        return checked_user.id == user.id;
      });
    } else {
      this.state.checked_users.push(user);
    }
    this.setState({checked_users: this.state.checked_users});
  }

  handleClickManager(user, checked) {
    if (checked) {
      _.remove(this.state.checked_managers, checked_user => {
        return checked_user.id == user.id;
      });
    } else {
      this.state.checked_managers.push(user);
    }
    this.setState({checked_managers: this.state.checked_managers});
  }

  handleClickMember(user, checked) {
    if (checked) {
      _.remove(this.state.checked_members, checked_user => {
        return checked_user.id == user.id;
      });
    } else {
      this.state.checked_members.push(user);
    }
    this.setState({checked_members: this.state.checked_members});
  }

  assignManagers() {
    let managers = this.state.managers.concat(this.state.checked_users);
    let unassigned_users = this.state.unassigned_users.filter(_user => {
      return this.state.checked_users.indexOf(_user) < 0;
    });
    this.setState({
      checked_users: [],
      managers: managers,
      unassigned_users: unassigned_users
    });
    this.props.handleAssignManagers(managers);
  }

  rejectUsers() {
    let unassigned_users = this.state.unassigned_users
      .concat(this.state.checked_managers, this.state.checked_members);
    let managers = this.state.managers.filter(_user => {
      return this.state.checked_managers.indexOf(_user) < 0;
    });
    let members = this.state.members.filter(_user => {
      return this.state.checked_members.indexOf(_user) < 0;
    });
    this.setState({
      checked_members: [],
      checked_managers: [],
      unassigned_users: unassigned_users,
      managers: managers,
      members: members
    });
    this.props.handleAssignManagers(managers);
    this.props.handleAssignMembers(members);
  }

  assignMembers() {
    let members = this.state.members.concat(this.state.checked_users);
    let unassigned_users = this.state.unassigned_users.filter(_user => {
      return this.state.checked_users.indexOf(_user) < 0;
    });
    this.setState({
      checked_users: [],
      members: members,
      unassigned_users: unassigned_users
    });
    this.props.handleAssignMembers(members);
  }

  renderOptions(objects) {
    if (objects) {
      return objects.map(object => {
        return <option key={object.id} value={object.id}>
            {object.name}
          </option>;
      });
    }
    return null;
  }
}
