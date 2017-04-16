import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import React from 'react';
import Trainers from './trainers';
import {IntlProvider, FormattedDate} from 'react-intl';
import {NewLayout} from '../shareds/griddles/new_layout';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import * as user_constants from '../users/user_constants';

const USER_URL = app_constants.APP_NAME + user_constants.USER_PATH;

export default class CourseLists extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      courses: props.courses,
      course_counts: null,
      program_name: props.program_name,
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      courses: nextProps.courses,
      course_counts: nextProps.course_counts,
      program_name: nextProps.program_name
    });

  }

  render() {
    {NewLayout}

    const Image = ({griddleKey}) => (
      <div className='td-box'>
        <img src={this.state.courses[griddleKey].image.url}
          className='thumbnail-image td-course-image img-circle'
          onError={this.checkImage.bind(this)} />
      </div>
    );

    const LinkToCourse = ({value, griddleKey}) => {
      let course = this.state.courses[griddleKey];
      let link = '#';
      if(course) {
        link = app_constants.APP_NAME + 'courses/'  + course.id;
      }
      return <a href={link} className="link-course">{value}</a>;
    };

    const ListTrainer = ({griddleKey}) => {
      let course = this.state.courses[griddleKey];
      return (
        <Trainers
          user_url={USER_URL}
          course={course}
        />);
    }


    const Status = ({griddleKey}) => {
      let course = this.state.courses[griddleKey];
      return (
        <p className={I18n.t('courses.class_status.' + course.status)}
          data-index={griddleKey}>
          {I18n.t('courses.' + course.status)}
        </p>
      )
    }

    const customDate = ({value}) => (
      <IntlProvider locale = "en">
        <FormattedDate value={new Date(value)}
          day="numeric" month="numeric" year="numeric" />
      </IntlProvider>
    );

    const Description = ({griddleKey}) => {
      let description = this.state.courses[griddleKey].description;
      if (description.length > 15){
        return (
          <p className='description' title={description}>
            {description.substring(0, 15)+ '...'}
          </p>
        )
      } else {
        return (
          <p className='description' title={description}>
            {description}
          </p>
        )
      }
    }

    return (
      <div className=''>
        <div className='box box-success'>
          <div className='box-header with-border'>
            <h3 className='box-title'>
              {I18n.t('programs.list_courses')}
            </h3>

            <div className='box-tools pull-right'>
              <button type='button' className='btn btn-box-tool' data-widget='collapse'>
                <i className='fa fa-minus'></i>
              </button>
              <button type='button' className='btn btn-box-tool' data-widget='remove'>
                <i className='fa fa-times'></i>
              </button>
            </div>
          </div>
          <div className='box-body'>
            <Griddle data={this.state.courses} plugins={[plugins.LocalPlugin]}
              components={{Layout: NewLayout}}
              styleConfig={table_constants.styleConfig}>
              <RowDefinition>
                <ColumnDefinition id='image'
                  title={I18n.t('programs.image')}
                  customComponent={Image} />
                <ColumnDefinition id='name'
                  title={I18n.t('programs.name')} customComponent={LinkToCourse} />
                <ColumnDefinition id='description'
                  title={I18n.t('programs.description')}
                  customComponent={Description} />
                <ColumnDefinition id='trainer'
                  title={I18n.t('courses.member.trainers')}
                  customComponent={ListTrainer} />
                <ColumnDefinition id='status' data-i18n
                  title={I18n.t('courses.status')}
                  customComponent={Status} />
                <ColumnDefinition id='start_date'
                  title={I18n.t('programs.start_date')}
                  customComponent={customDate} />
                <ColumnDefinition id='end_date'
                  title={I18n.t('programs.end_date')}
                  customComponent={customDate} />
              </RowDefinition>
            </Griddle>
          </div>
        </div>
      </div>
    );
  }

  checkImage(event){
    let target = event.target;
    $(target).attr('src', '/assets/image_found.png')
  }

  handleClick() {
    let $target = $(event.target);
    $target.blur();
    $('#modalManager').modal();
  }
}
