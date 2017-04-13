import React from 'react';

export default class CoursesStatistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: props.number
    };
  }

  render() {
    return (
      <div className='col-md-3 info-panel td-padding-top-course-lists
        custom-info'>
        <div className="custom-info">
          <div className='box box-primary'>
            <div className='box-header with-border'>
              <h3 className='box-title'>
                <strong>
                  {I18n.t('organizations.titles.info')}
                </strong>
              </h3>
            </div>
            <div className='box-body'>
              <div>
                <div className='member-title'>
                  <i className='fa fa-book' aria-hidden='true'></i>
                  <strong>
                    {I18n.t('organizations.num_courses')}
                  </strong>
                  <span className='badge label-primary'>
                    {this.state.number}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
