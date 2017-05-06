import * as routes from 'config/routes';
import * as react_table_ultis from 'shared/react-table/ultis';
import * as table_constants from 'constants/griddle_table_constants';
import css from 'assets/sass/react-table.scss';
import React from 'react';
import ReactTable from 'react-table';
import Trainers from './trainers';
import {IntlProvider, FormattedDate} from 'react-intl';

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
    const columns = [
      {
        header: '#',
        accessor: 'position',
        render: row => <div className='text-right'>{row.index + 1}</div>,
        hideFilter: true,
        width: 50
      },
      {
        header: I18n.t('programs.image'),
        accessor: 'image',
        render: row => {
          return (
            <div className='td-box'>
              <img src={row.row.image.url}
                className='thumbnail-image td-course-image img-circle'
                onError={this.checkImage.bind(this)} />
            </div>
          )
        },
        sortable: false,
        hideFilter: true,
      },
      {
        header: I18n.t('programs.name'),
        accessor: 'name',
        render: row => {
          return <a href={routes.course_url(row.row.id)}
            className='link-course'>{row.value}</a>;
        }
      },
      {
        header: I18n.t('programs.description'),
        accessor: 'description',
        render: row => {
          return (
            <p className='description' title={row.value}>
              {row.value}
            </p>
          )
        }
      },
      {
        header: I18n.t('courses.member.trainers'),
        accessor: 'trainer',
        render: row => {
          return (
            <Trainers
              user_url={routes.users_url()}
              course={row.row}
            />
          );
        }
      },
      {
        header: I18n.t('courses.status'),
        accessor: 'status',
        render: row => {
          return (
            <p className={I18n.t('courses.class_status.' + row.value)}
              data-index={row.index}>
              {I18n.t('courses.' + row.value)}
            </p>
          )
        }
      },
      {
        header: I18n.t('programs.start_date'),
        accessor: 'start_date',
        render: row => {
          return (
            <IntlProvider locale='en'>
              <FormattedDate value={new Date(row.value)}
                day='numeric' month='numeric' year='numeric' />
            </IntlProvider>
          )
        }
      },
      {
        header: I18n.t('programs.end_date'),
        accessor: 'end_date',
        render: row => {
          return (
            <IntlProvider locale='en'>
              <FormattedDate value={new Date(row.value)}
                day='numeric' month='numeric' year='numeric' />
            </IntlProvider>
          )
        }
      },
    ]

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
            <ReactTable
              className='-striped -highlight' data={this.state.courses}
              columns={columns} defaultPageSize={react_table_ultis.defaultPageSize}
              showFilters={true}
              defaultFilterMethod={react_table_ultis.defaultFilter}
            />
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
