import React from 'react';

export default class TabsHeader extends React.Component {
  render() {
    let team_tabs = null;
    if(this.props.course) {
      return (
        <ul className='nav nav-tabs pull-left'>
          <li className='active'>
            <a data-toggle='tab' href='#list_team'>
              <i className='fa fa-pencil-square-o'></i>
                {I18n.t('subjects.titles.list_team')}
            </a>
          </li>
          <li>
            <a data-toggle='tab' href='#user-subject'>
              <i className='fa fa-file-text-o'></i>
                {I18n.t('subjects.titles.unassigned_members')}
            </a>
          </li>
          <li>
            <a data-toggle='tab' href='#home'>
              <i className='fa fa-file-text-o'></i>
              {I18n.t('subjects.titles.surveys')}
            </a>
          </li>
          <li>
            <a data-toggle='tab' href='#menu1'>
              <i className='fa fa-pencil-square-o'></i>
              {I18n.t('subjects.titles.assignments')}
            </a>
          </li>
          <li>
            <a data-toggle='tab' href='#menu2'>
              <i className='fa fa-check-square-o'></i>
              {I18n.t('subjects.titles.tests')}
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className='nav nav-tabs pull-left'>
          <li className='active'>
            <a data-toggle='tab' href='#home'>
              <i className='fa fa-file-text-o'></i>
              {I18n.t('subjects.titles.surveys')}
            </a>
          </li>
          <li>
            <a data-toggle='tab' href='#menu1'>
              <i className='fa fa-pencil-square-o'></i>
              {I18n.t('subjects.titles.assignments')}
            </a>
          </li>
          <li>
            <a data-toggle='tab' href='#menu2'>
              <i className='fa fa-check-square-o'></i>
              {I18n.t('subjects.titles.tests')}
            </a>
          </li>
        </ul>
      );
    }
  }
}
