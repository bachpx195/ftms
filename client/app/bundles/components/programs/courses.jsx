import * as routes from 'config/routes';
import * as react_table_ultis from 'shared/react-table/ultis';
import css from 'assets/sass/react-table.scss';
import React from 'react';
import ReactTable from 'react-table';
import Trainers from './trainers';

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
        width: 60
      },
      {
        header: I18n.t('programs.name'),
        accessor: 'name',
        render: row => {
          return <a href={routes.course_url(row.row.id)}
            className='link-course'>{row.value}</a>;
        },
        minWidth: 150
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
        },
        minWidth: 150
      },
      {
        header: I18n.t('courses.member.trainers'),
        id: 'trainer',
        accessor: d => d.users.map(user => user.name).join(),
        render: row => {
          return <Trainers user_url={routes.users_url()} course={row.row} />;
        },
        minWidth: 180
      },
      {
        header: I18n.t('courses.status'),
        id: 'status',
        accessor: d => I18n.t('courses.' + d.status),
        render: ({row}) => {
          return (
            <span className={I18n.t('courses.class_status.' + row.status)}>
              {I18n.t('courses.' + row.status)}
            </span>
          );
        }
      },
      {
        header: I18n.t('programs.start_date'),
        id: 'start_date',
        accessor: d => this.formatDate(d.start_date),
        style: {textAlign: 'right'}
      },
      {
        header: I18n.t('programs.end_date'),
        id: 'end_date',
        accessor: d => this.formatDate(d.end_date),
        style: {textAlign: 'right'}
      },
    ];

    return (
      <div className=''>
        <div className='box box-success'>
          <div className='box-header with-border'>
            <h3 className='box-title'>
              {I18n.t('programs.list_courses')}
            </h3>

            <div className='box-tools pull-right'>
              <button type='button' className='btn btn-box-tool'
                data-widget='collapse'>
                <i className='fa fa-minus'></i>
              </button>
              <button type='button' className='btn btn-box-tool'
                data-widget='remove'>
                <i className='fa fa-times'></i>
              </button>
            </div>
          </div>
          <div className='box-body'>
            <ReactTable
              className='-striped -highlight' data={this.state.courses}
              columns={columns} showFilters={true}
              defaultPageSize={react_table_ultis.defaultPageSize}
              defaultFilterMethod={react_table_ultis.defaultFilter}
            />
          </div>
        </div>
      </div>
    );
  }

  formatDate(date) {
    if (date) return I18n.l('date.formats.default', date);
    return null;
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
