import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import {IntlProvider, FormattedDate} from 'react-intl';
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
    const NewLayout = ({Table, Pagination, Filter}) => (
      <div className='row'>
        <div className='griddle-head clearfix'>
          <div className='col-md-6'>
            <Filter />
          </div>
          <div className='col-md-6 text-right'>
            <Pagination />
          </div>
        </div>
        <Table />
      </div>
    );
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
        link = this.props.url + '/courses/'  + course.id;
      }
      return <a href={link} className="link-course">{value}</a>;
    };

    const ListTrainer = ({griddleKey}) => {
      let course = this.state.courses[griddleKey];
      let trainers = [];
      let subsit_users = null;
      if(course.users){
        let count_subsit_users = course.users.length - 2;
        trainers = course.users.slice(0,2).map((trainer, index) => {
          return (<div key={index} className="block-trainer">
            <a className="image" onError={this.checkImage.bind(this)}
              title={trainer.name} href={USER_URL + trainer.id} >
              <img src={trainer.avatar.url} className='img-circle' />
            </a>
          </div>);
        });
        if(count_subsit_users > 0) {
          subsit_users = (
            <div className='subsit_users'>
              <div className="block-trainer">
                <p className="image image-others"
                  onClick={this.handleClick.bind(this)}
                  title={I18n.t('organizations.other_managers')} >
                  <img src='/assets/profile.png' className='img-circle' />
                  <span className='count-users'>{count_subsit_users}+</span>
                </p>
              </div>
              <div id='modalManager' className='modal fade in' role='dialog'>
                <div className='modal-dialog'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <button type='button' className='close'
                        data-dismiss='modal'>&times;</button>
                      <h4 className='modal-title'>
                        {I18n.t('organizations.all_managers')}
                      </h4>
                    </div>
                    <div className='modal-body'>
                      {this.renderOtherManagers(course.users.slice(0, course.users.length))}
                    </div>
                    <div className='clearfix'></div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      }
      return(
        <div className="list-trainers" key={'course'+course.id}>
          {trainers}
          {subsit_users}
        </div>
      )
    }


    const Status = ({griddleKey}) => {
      let course = this.state.courses[griddleKey];
      return(
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
        return(
          <p className='description' title={description}>
            {description.substring(0, 15)+ '...'}
          </p>
        )
      } else {
        return(
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

  renderOtherManagers(course_users) {
    return(
      course_users.map((trainer, index) => {
        return(
          <div key={index} className="block-trainer">
            <a className="image" onError={this.checkImage.bind(this)}
              title={trainer.name} href={USER_URL + trainer.id} >
              <img src={trainer.avatar.url} className='img-circle' />
            </a>
          </div>
        )
      })
    )
  }

}
