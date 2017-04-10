import React from 'react';

export default class TabsHeader extends React.Component {
  render() {
    if(this.props.course) {
      return (
        <ul className='nav nav-tabs pull-left'>
          <li className='active'>
            <a data-toggle='tab' href='#tab-team-list'>
              <div className='custom-subjects-titles'>
                <i className='fa fa-pencil-square-o'></i>
                {I18n.t('subjects.titles.list_team')}
              </div>
            </a>
          </li>
          <li>
            <a data-toggle='tab' href='#tab-user-subject-list'>
              <div className='custom-subjects-titles'>
                <i className='fa fa-file-text-o'></i>
                {I18n.t('subjects.titles.unassigned_members')}
              </div>
            </a>
          </li>
          <li>
            <a data-toggle='tab' href='#tab-surveys'>
              <div className='custom-subjects-titles'>
                <i className='fa fa-file-text-o'></i>
                {I18n.t('subjects.titles.surveys')}
              </div>
            </a>
          </li>
          <li>
            <a data-toggle='tab' href='#tab-assignments'>
              <div className='custom-subjects-titles'>
                <i className='fa fa-pencil-square-o'></i>
                {I18n.t('subjects.titles.assignments')}
              </div>
            </a>
          </li>
          <li>
            <a data-toggle='tab' href='#tab-test-rules'>
              <div className='custom-subjects-titles'>
                <i className='fa fa-check-square-o'></i>
                {I18n.t('subjects.titles.tests')}
              </div>
            </a>
          </li>
          <li>
            <a data-toggle='tab' href='#tab-documents'>
              <div className='custom-subjects-titles'>
                <i className='fa fa-file-text-o'></i>
                {I18n.t('subjects.titles.documents')}
              </div>
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className='nav nav-tabs pull-left'>
          <li className='active'>
            <a data-toggle='tab' href='#tab-surveys'>
              <div className='custom-subjects-titles'>
                <i className='fa fa-file-text-o'></i>
                {I18n.t('subjects.titles.surveys')}
              </div>
            </a>
          </li>
          <li>
            <a data-toggle='tab' href='#tab-assignments'>
              <div className='custom-subjects-titles'>
                <i className='fa fa-pencil-square-o'></i>
                {I18n.t('subjects.titles.assignments')}
              </div>
            </a>
          </li>
          <li>
            <a data-toggle='tab' href='#tab-test-rules'>
              <div className='custom-subjects-titles'>
                <i className='fa fa-check-square-o'></i>
                {I18n.t('subjects.titles.tests')}
              </div>
            </a>
          </li>
          <li>
            <a data-toggle='tab' href='#tab-documents'>
              <div className='custom-subjects-titles'>
                <i className='fa fa-file-text-o'></i>
                {I18n.t('subjects.titles.documents')}
              </div>
            </a>
          </li>
        </ul>
      );
    }
  }
}
