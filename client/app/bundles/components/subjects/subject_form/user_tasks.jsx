import * as react_table_ultis from 'shared/react-table/ultis';
import * as routes from 'config/routes';
import axios from 'axios';
import css from 'assets/sass/react-table.scss';
import React from 'react';
import ReactTable from 'react-table';

export default class UserTasks extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      user_tasks: props.user_tasks,
      type: props.type
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      user_tasks: nextProps.user_tasks,
      type: nextProps.type
    })
  }
  render() {
    if (this.state.type == '') return null;

    const columns = [
      {
        header: '#',
        accessor: 'position',
        render: row => row.index + 1,
        hideFilter: true,
        style: {textAlign: 'right'},
        width: 50
      },
      {
        header: I18n.t('subjects.headers.name'),
        accessor: 'name',
      },
      {
        header: I18n.t('subjects.headers.content'),
        accessor: 'content',
      },
      {
        header: '',
        accessor: 'action',
        render: ({row}) => {
          return (
            <div className='buttonDelete'>
              <button className='btn btn-danger'
                title={I18n.t('buttons.delete')}
                onClick={this.onClickDeleteTask.bind(this, row)}>
                <i className='fa fa-trash'></i>
              </button>
            </div>
          );
        },
        hideFilter: true,
        style: {textAlign: 'center'},
        sortable: false,
        width: 75
      }
    ];

    return(
      <div className='block-task col-md-12 clearfix'>
        <ReactTable className='-striped -highlight'
          data={this.state.user_tasks[this.state.type]}
          columns={columns} showFilters={true}
          defaultPageSize={react_table_ultis.defaultPageSize}
          defaultFilterMethod={react_table_ultis.defaultFilter}
        />
      </div>
    );
  }

  onClickDeleteTask(task) {
    if (confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(routes.assign_task_url(task.task_id), {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        this.props.handleAfterDeleteTask(task.task_id, task, this.state.type,
          this.props.user_index, this.props.user)
      })
      .catch(error => console.log(error));
    }
  }
}
