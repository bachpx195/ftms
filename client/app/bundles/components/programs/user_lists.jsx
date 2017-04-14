import axios from 'axios';
import React from 'react';
import { NewLayout } from '../shareds/griddles/new_layout';

export default class UserLists extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      users: props.users,
      user_counts: props.user_counts,
      program_name: props.program_name,
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      users: nextProps.users,
      user_counts: nextProps.user_counts,
      program_name: nextProps.program_name
    });
  }

  renderListUsers () {
    let user_example = (this.state.users || []).slice(0, 7);
    return _.map(user_example, user => {
      return (
        <li key={user.id} className='td-program-list-user'>
          <img src={`${user.avatar}`} alt='User Image'
            title={`${user.name}\n${user.type}`}/>
        </li>
      );
    });
  }

  renderListUsersFull () {
    return _.map(this.state.users, user => {
      return (
        <li key={user.id}>
          <img src={`${user.avatar}`} alt='User Image' className='img-responsive'/>
          <p className='users-list-name'>{user.name}</p>
          <span className='users-list-date'>{user.type}</span>
        </li>
      );
    });
  }

  render() {
    {NewLayout}
    let user_list_counts = this.state.user_counts - 7;

    const Image = ({griddleKey}) => (
      <img src={this.state.users[griddleKey].avatar}
        className='thumbnail-image td-user-avatar'/>
    );
    return (
      <div className='col-lg-3 col-xs-6'>
        <ul className='users-list clearfix td-program-users'>
          {this.renderListUsers()}
          <li className='td-user-list-modal' data-toggle='modal'
            data-target='.user-lists-modal'>
            <b>{user_list_counts}+</b>
          </li>
        </ul>
        <div className='modal fade user-lists-modal' role='dialog'>
          <div className='modal-dialog width-70'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close' data-dismiss='modal'>&times;</button>
                <h4 className='modal-title'>
                  {I18n.t('programs.member')}
                </h4>
              </div>
              <div className='modal-body'>
                <ul className='users-list-fix clearfix'>
                  {this.renderListUsersFull()}
                </ul>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-default' data-dismiss='modal'>
                  {I18n.t('programs.close')}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
