import React from  'react';
import * as routes from 'config/routes';

export default class ProgramRightPanel extends React.Component {
  render() {
    return (
      <div>
        <div className='box box-primary'>
          <div className='box-header with-border box-header-gray'>
            <h3 className='box-title'>
              <strong>{I18n.t('programs.user_panel.title')} </strong>
            </h3>
            <a className='btn btn-default pull-right'
              href={routes.new_program_user_url(this.props.program_detail.id)}>
              <i className='fa fa-user-plus'></i>
            </a>
          </div>
        </div>
        <div className='box box-primary'>
            <div className='box-header with-border box-header-gray'>
              <h3 className='box-title'>
                <strong>{I18n.t('programs.list_courses')} </strong>
              </h3>
              <span className='badge label-primary'>
                {this.props.program_detail.course_counts}
              </span>
            </div>
            <div className='box-body'>
              <div className='info-box bg-gray'>
                <span className='info-box-icon'>
                  <i className='fa fa-flag-checkered fa-1x'></i>
                </span>
                <div className='info-box-content'>
                  <span className='info-box-text'>
                    {I18n.t('programs.list_init_courses')}
                  </span>
                  <span className='info-box-number'>
                    {this.countCoursesByStatus('init')}
                  </span>
                </div>
              </div>
              <div className='clearfix'></div>
              <div className='info-box bg-blue'>
                <span className='info-box-icon'>
                  <i className='fa fa-hourglass-half fa-1x'></i>
                </span>
                <div className='info-box-content'>
                  <span className='info-box-text'>
                    {I18n.t('programs.list_in_progress_courses')}
                  </span>
                  <span className='info-box-number'>
                    {this.countCoursesByStatus('in_progress')}
                  </span>
                </div>
              </div>
              <div className='clearfix'></div>
              <div className='info-box bg-green'>
                <span className='info-box-icon'>
                  <i className='fa fa-check fa-1x'></i>
                </span>
                <div className='info-box-content'>
                  <span className='info-box-text'>
                    {I18n.t('programs.list_finished_courses')}
                  </span>
                  <span className='info-box-number'>
                    {this.countCoursesByStatus('finished')}
                  </span>
                </div>
              </div>
            </div>
          </div>
      </div>
    );
  }

  countCoursesByStatus(status) {
    let count = 0;
    _.map(this.props.program_detail.courses, course => {
      if (course.status == status) count++;
    });
    return count;
  }
}
