import React from  'react';

export default class ProgramRightPanel extends React.Component {
  render() {
    return (
      <div className='col-md-3 info-panel'>

        <div>
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
              <div className="info-box bg-gray">
                <span className="info-box-icon">
                  <i className="fa fa-flag-checkered fa-1x"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">
                    {I18n.t('programs.list_init_courses')}
                  </span>
                  <span className="info-box-number">
                    {this.countCoursesByStatus("init")}
                  </span>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="info-box bg-blue">
                <span className="info-box-icon">
                  <i className="fa fa-hourglass-half fa-1x"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">
                    {I18n.t('programs.list_in_progress_courses')}
                  </span>
                  <span className="info-box-number">
                    {this.countCoursesByStatus("in_progress")}
                  </span>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="info-box bg-green">
                <span className="info-box-icon">
                  <i className="fa fa-check fa-1x"></i>
                </span>
                <div className="info-box-content">
                  <span className="info-box-text">
                    {I18n.t('programs.list_finished_courses')}
                  </span>
                  <span className="info-box-number">
                    {this.countCoursesByStatus("finished")}
                  </span>
                </div>
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
      if(course.status == status) {
        count++;
      }
    });
    return count;
  }
}