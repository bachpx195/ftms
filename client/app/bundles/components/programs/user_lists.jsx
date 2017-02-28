import React from 'react';
import axios from 'axios';

export default class UserLists extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      users: [],
      user_counts: null,
      program_name: '',
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
    return _.map(this.state.users, user => {
      return (
        <li key={user.id} className='col-xs-3'>
          <img src={`${user.avatar}`} alt='User Image' />
          <p className='users-list-name'>{user.name}</p>
          <span className='users-list-date'>{user.type}</span>
        </li>
      );
    });
  }

  render() {
    const NewLayout = ({Table, Pagination, Filter}) => (
      <div className='col-md-12'>
        <div className='row'>
          <div className='griddle-head clearfix'>
            <div className='col-md-6'>
              <Filter />
            </div>
            <div className='col-md-6 text-right'>
              <Pagination />
            </div>
          </div>
          <div className='col-md-12'>
            <Table />
          </div>
        </div>
      </div>
    );

    const Image = ({griddleKey}) => (
      <img src={this.state.users[griddleKey].avatar}
        className='thumbnail-image td-user-avatar'/>
    );

    return (
      <div className='col-md-12'>
        <div className='box box-info'>
          <div className='box-header with-border'>
            <h3 className='box-title'>
              {this.state.program_name}
              {I18n.t('programs.list_users')}
            </h3>

            <div className='box-tools pull-right'>
              <button type='button' className='btn btn-box-tool' data-widget='collapse'>
                <i className='fa fa-minus'></i>
              </button>
              <button type='button' className='btn btn-box-tool' data-widget='remove'>
                <i className='fa fa-times'></i>
              </button>
            </div>
          </div>
          <div className='box-body'>
            <div className='row'>
              <ul className='users-list clearfix'>
                {this.renderListUsers()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
