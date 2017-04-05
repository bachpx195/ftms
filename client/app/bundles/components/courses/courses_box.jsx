import React from 'react';
import TraineeCourse from './trainee/trainee_course_lists';
import CourseList from './course_lists';
import CoursePolicy from 'policy/course_policy';

export default class CourseBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_my_space: props.is_my_space || false,
      courses: props.courses || [],
      user_courses: props.user_courses || []
    };
  }

  render() {
    let count_courses = this.state.courses.length;

    const courseListPermit = [
      {controller: 'courses', action: ['index', 'ownerController'],
        target: 'courseList', data: {controller: 'courses'}},
      {controller: 'my_space/courses', action: ['index', 'ownerController'],
        target: 'traineeCourse', data: {controller: 'my_space/courses'}}
    ];

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="box box-success">
            <div className="box-header with-border">
              <h3 className="box-title">{I18n.t("courses.titles.all")}</h3>

              <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool"
                  data-widget="collapse">
                  <i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool"
                  data-widget="remove">
                  <i className="fa fa-times"></i>
                </button>
              </div>
            </div>
            <div className="box-body no-padding">
              <div className="row">
                <div className="col-md-9">
                  <div className='course-container'>
                    <div className='row'>
                      <CoursePolicy
                        permit={courseListPermit}
                        courseList={<CourseList courses={this.state.courses} />}
                        traineeCourse={<TraineeCourse courses={this.state.courses}
                          user_courses={this.state.user_courses} />}
                      />
                    </div>
                  </div>
                </div>
                <div className='col-md-3 info-panel td-padding-top-course-lists custom-info'>
                  <div className="custom-info">
                    <div className='box box-primary'>
                      <div className='box-header with-border'>
                        <h3 className='box-title'>
                          <strong>{I18n.t('organizations.titles.info')}</strong>
                        </h3>
                      </div>
                      <div className='box-body'>
                        <div>
                          <div className='member-title'>
                            <i className='fa fa-book' aria-hidden='true'></i>
                            <strong>
                              {I18n.t('organizations.num_courses')}
                            </strong>
                            <span className='badge label-primary'>{count_courses}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
