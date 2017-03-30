import React from 'react';
import TraineeCourse from './trainee/trainee_course_lists';
import CourseList from './course_lists';

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
    let content = null;
    let courses_policy = new Policy({
      is_my_space: this.state.is_my_space,
      controller_name: "courses",
      action: "index"
      });

    if (courses_policy.isMySpace()) {
      content = <CourseList
        courses={this.state.courses}
      />
    } else {
      content = <TraineeCourse
        courses={this.state.courses}
        user_courses={this.state.user_courses}
      />
    }

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
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
