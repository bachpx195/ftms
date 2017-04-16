import React from  'react';

export default class ProgramInfo extends React.Component {
  render() {
    return (
      <div className='col-md-6 program-control'>
        <div className='box box-primary box-float'>
          <div className='box-header with-border box-header-gray'>
            <h4 className='box-title'>
              <strong>{I18n.t('programs.info')}</strong>
            </h4>
          </div>
          <div className='box-body'>
            <div>
              <div className='member-title'>
                <strong>{I18n.t('programs.headers.name')}: </strong>
                {this.props.program_detail.name}
              </div>
              <br />
              <div className='member-title'>
                <strong>{I18n.t('programs.organization')}: </strong>
                {this.props.organization.name}
              </div>
              <br />
              <div className='member-title'>
                <strong>{I18n.t('programs.owners')}: </strong>
              </div>
              {this.renderMembers(this.props.owners)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderMembers(users) {
    return (
      <ul className='user-list clearfix'>
        {users.map(user => this.renderUser(user))}
      </ul>
    );
  }
}
