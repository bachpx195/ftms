import React from 'react';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from
  'griddle-react';
import {NewLayout} from '../shareds/griddles/new_layout';
import * as table_constants from 'constants/griddle_table_constants';
import * as routes from 'config/routes';
import ExamPolicy from 'policy/exam_policy';
import Show from './actions/show';

export default class Exams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exams: props.exams
    };
  }

  render() {
    const UserLink = ({griddleKey}) => {
      let user = this.state.exams[griddleKey].user;
      let user_url = routes.user_url(user.id);
      return <a href={user_url}>{user.name}</a>;
    };

    const SubjectLink = ({griddleKey}) => {
      return <span>{this.state.exams[griddleKey].subject.name}</span>;
    };

    const CourseLink = ({griddleKey}) => {
      let course = this.state.exams[griddleKey].course;
      let course_url = routes.course_url(course.id);
      return <a href={course_url}>{course.name}</a>;
    };

    const CreatedDate = ({value}) => {
      return <span>{I18n.l('date.formats.default', value)}</span>;
    };

    const ButtonView = ({griddleKey}) => {
      let exam = this.state.exams[griddleKey];
      return <Show exam={exam} organization={this.props.organization} />;
    };

    return (
      <div>
        <Griddle data={this.state.exams} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id='user'
              title={I18n.t('exams.headers.user')}
              customComponent={UserLink} />
            <ColumnDefinition id='subject'
              title={I18n.t('exams.headers.subject')}
              customComponent={SubjectLink} />
            <ColumnDefinition id='course'
              title={I18n.t('exams.headers.course')}
              customComponent={CourseLink} />
            <ColumnDefinition id='created_at'
              title={I18n.t('exams.headers.created_at')}
              customComponent={CreatedDate} />
            <ColumnDefinition id='spent_time'
              title={I18n.t('exams.headers.spent_time')} />
            <ColumnDefinition id='score'
              title={I18n.t('exams.headers.score')} />
            <ColumnDefinition id='view' title=' '
              customComponent={ButtonView} />
          </RowDefinition>
        </Griddle>
      </div>
    );
  }
}
