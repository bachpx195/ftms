import React from 'react';

export default class TabsHeader extends React.Component {
  render() {
    if(this.props.course) {
      return (
        <ul className='nav nav-tabs pull-left'>
          <li className='active'>
            <a data-toggle='tab' href='#list_team'>
              <div className='custom-subjects-titles'>
                <i className='fa fa-pencil-square-o'></i>
                {I18n.t('subjects.titles.list_team')}
              </div>
            </a>
          </li>
          <li>
            <a data-toggle='tab' href='#user-subject'>
              <div className='custom-subjects-titles'>
                <i className='fa fa-file-text-o'></i>
                {I18n.t('subjects.titles.unassigned_members')}
              </div>
            </a>
          </li>
          <li>
            <a data-toggle='tab' href='#home'>
              <div className='custom-subjects-titles'>
                <i className='fa fa-file-text-o'></i>
                {I18n.t('subjects.titles.surveys')}
              </div>
            </a>
          </li>
          <li>
            <a data-toggle='tab' href='#menu1'>
              <div className='custom-subjects-titles'>
                <i className='fa fa-pencil-square-o'></i>
                {I18n.t('subjects.titles.assignments')}
              </div>
            </a>
          </li>
          <li>
            <a data-toggle='tab' href='#menu2'>
              <div className='custom-subjects-titles'>
                <i className='fa fa-check-square-o'></i>
                {I18n.t('subjects.titles.tests')}
              </div>
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className='nav nav-tabs pull-left'>
          <li className='active'>
            <a data-toggle='tab' href='#home'>
              <div className='custom-subjects-titles'>
                <i className='fa fa-file-text-o'></i>
                {I18n.t('subjects.titles.surveys')}
              </div>
            </a>
          </li>
          <li>
            <a data-toggle='tab' href='#menu1'>
              <div className='custom-subjects-titles'>
                <i className='fa fa-pencil-square-o'></i>
                {I18n.t('subjects.titles.assignments')}
              </div>
            </a>
          </li>
          <li>
            <a data-toggle='tab' href='#menu2'>
              <div className='custom-subjects-titles'>
                <i className='fa fa-check-square-o'></i>
                {I18n.t('subjects.titles.tests')}
              </div>
            </a>
          </li>
        </ul>
      );
    }
  }
}
