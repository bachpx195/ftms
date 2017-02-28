import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';

export default class CourseLists extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      courses: [],
      course_counts: null,
      program_name: '',
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
      <div className='col-md-12'>
        <div className='row'>
          <div className='griddle-head clearfix'>
            <div className='col-md-6'>
              <Filter />
            </div>
            <div className='col-md-6 text-right'>
              <Pagination />
            </div>
          </div>
          <div className='col-md-12'>
            <Table />
          </div>
        </div>
      </div>
    );

    const Image = ({griddleKey}) => (
      <div className='td-box'>
        <img src={this.state.courses[griddleKey].image}
          className='thumbnail-image td-course-image'/>
      </div>
    );

    return (
      <div className='col-md-12'>
        <div className='box box-success'>
          <div className='box-header with-border'>
            <h3 className='box-title'>
              <span>{this.state.program_name}</span>
              <span>{I18n.t('programs.list_courses')}</span>
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
                  title={I18n.t('programs.name')} />
                <ColumnDefinition id='description'
                  title={I18n.t('programs.description')} />
                <ColumnDefinition id='start_date'
                  title={I18n.t('programs.start_date')} />
                <ColumnDefinition id='end_date'
                  title={I18n.t('programs.end_date')} />
              </RowDefinition>
            </Griddle>
          </div>
        </div>
      </div>
    );
  }
}
