import * as react_table_ultis from 'shared/react-table/ultis';
import * as routes from 'config/routes';
import css from 'assets/sass/react-table.scss';
import ModalMetaTasks from './modal_meta_tasks';
import React from 'react';
import ReactTable from 'react-table';

export default class DynamicTasks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      meta_tasks: []
    }
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
        header: I18n.t('tasks.headers.name'),
        accessor: 'user.name',
        render: row => <a href={routes.user_url(row.row.id)}>{row.value}</a>
      },
      {
        header: I18n.t('tasks.headers.status'),
        id: 'status',
        accessor: d => I18n.t('tasks.statuses.' + d.status),
        render: ({row}) => {
          return (
            <span className={I18n.t('tasks.class_statuses.' + row.status)}>
              {I18n.t('tasks.statuses.' + row.status)}
            </span>
          );
        },
        width: 250
      }
    ];

    if (this.props.type == 'Assignment') {
      columns.push({
        header: I18n.t('tasks.meta_tasks'),
        accessor: 'meta_task_button',
        render: ({row}) => {
          return (
            <button type='button' className='btn btn-success'
              onClick={this.showMetaTasks.bind(this, row.meta_tasks)}>
              <i className='fa fa-eye'></i>
            </button>
          );
        },
        style: {textAlign: 'center'},
        width: 100,
        hideFilter: true,
        sortable: false
      });
    }

    return (
      <div className='row'>
        <ReactTable
          className='-striped -highlight' data={this.props.tasks}
          columns={columns} showFilters={true}
          defaultPageSize={react_table_ultis.defaultPageSize}
          defaultFilterMethod={react_table_ultis.defaultFilter}
        />
        <ModalMetaTasks meta_tasks={this.state.meta_tasks} />
      </div>
    );
  }

  showMetaTasks(meta_tasks) {
    this.setState({meta_tasks: meta_tasks});
    $('.modal-meta-tasks').modal();
  }
}
