import * as react_table_ultis from 'shared/react-table/ultis';
import * as routes from 'config/routes';
import css from 'react-table/react-table.css';
import React from 'react';
import ReactTable from 'react-table';
import Show from './actions/show';

export default class Exams extends React.Component {
  render() {
    const columns = [
      {
        header: I18n.t('exams.headers.user'),
        id: 'user',
        accessor: d => d.user,
        render: ({row}) => {
          let user_url = routes.user_url(row.user.id);
          return <a href={user_url}>{row.user.name}</a>
        },
        filterMethod: (filter, row) => {
          return row.user.name.toLowerCase()
            .includes(filter.value.toLowerCase());
        }
      },
      {
        header: I18n.t('exams.headers.subject'),
        id: 'subject_name',
        accessor: d => d.subject.name
      },
      {
        header: I18n.t('exams.headers.course'),
        id: 'course',
        accessor: d => d.course,
        render: ({row}) => {
          let course_url = routes.course_url(row.course.id);
          return <a href={course_url}>{row.course.name}</a>;
        },
        filterMethod: (filter, row) => {
          return row.course.name.toLowerCase()
            .includes(filter.value.toLowerCase());
        }
      },
      {
        header: I18n.t('exams.headers.created_at'),
        id: 'created_at',
        accessor: d => I18n.l('date.formats.default', d.created_at)
      },
      {
        header: I18n.t('exams.headers.spent_time'),
        accessor: 'spent_time'
      },
      {
        header: I18n.t('exams.headers.score'),
        accessor: 'score'
      },
      {
        header: '',
        id: 'view_button',
        accessor: d => {
          return <Show exam={d} organization={this.props.organization} />;
        },
        filterRender: () => null,
        sortable: false
      }
    ];

    return (
      <div className='exams-table'>
        <ReactTable className='-striped -highlight' data={this.props.exams}
          columns={columns} defaultPageSize={react_table_ultis.defaultPageSize}
          showFilters={true}
          defaultFilterMethod={react_table_ultis.defaultFilter}
        />
      </div>
    );
  }
}
