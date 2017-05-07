import React from 'react';
import CoursePolicy from 'policy/course_policy';

export default class CoursesStatistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: props.number
    };
  }

  renderInfor() {
    let num_manager_courses = 0;
    let num_member_courses = 0;
    if (this.props.manager_courses != undefined){
      num_manager_courses = this.props.manager_courses.length;
    }
    if (this.props.member_courses != undefined){
      num_member_courses = this.props.member_courses.length;
    }
    return (
      <CoursePolicy permit={[{controller: 'my_space/courses',
        action: ['index', 'ownerController'], target: 'children',
        data: {controller: 'my_space/courses'}}]}>
        <div>
          <div className='member-title'>
            <i className='fa fa-bookmark' aria-hidden='true'></i>
            <strong>
              {I18n.t('courses.courses_manager')}
            </strong>
            <span className='badge label-primary'>
              {num_manager_courses}
            </span>
          </div>
          <div className='member-title'>
            <i className='fa fa-bookmark' aria-hidden='true'></i>
            <strong>
              {I18n.t('courses.courses_trainee')}
            </strong>
            <span className='badge label-primary'>
              {num_member_courses}
            </span>
          </div>
        </div>
      </CoursePolicy>);
  }

  render() {
    return (
      <div className='col-md-3 info-panel td-padding-top-course-lists
        custom-info'>
        <div className='custom-info'>
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
                  <i className='fa fa-bookmark' aria-hidden='true'></i>
                  <strong>
                    {I18n.t('organizations.num_courses')}
                  </strong>
                  <span className='badge label-primary'>
                    {this.state.number}
                  </span>
                </div>
                {this.renderInfor()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
