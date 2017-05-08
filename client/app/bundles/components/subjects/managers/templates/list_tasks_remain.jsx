import * as react_table_ultis from 'shared/react-table/ultis';
import * as routes from 'config/routes';
import axios from 'axios';
import css from 'assets/sass/react-table.scss';
import CheckBox from './check_box'
import React from 'react';
import ReactTable from 'react-table';

export default class ListTasksRemain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remain_tasks: props.remain_tasks,
      type: props.type,
      targetable_ids: [],
      targetable_type: props.targetable_type,
      user_id: props.user ? props.user.user_id : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      type: nextProps.type,
      targetable_type: nextProps.targetable_type,
      remain_tasks: nextProps.remain_tasks
    });
  }

  render() {
    let {type} = this.state;
    if (type == '') return null;
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
        header: I18n.t('tasks.headers.name'),
        accessor: 'name',
      },
      {
        header: I18n.t('tasks.headers.content'),
        accessor: 'content',
      },
      {
        header: '',
        accessor: 'action',
        render: row => {
          let id;
          if (this.props.targetable_type == 'StaticTask') {
            id = row.row.task_id
          } else {
            id = row.row.id
          }
          return <CheckBox id={id}
            afterClickCheckbox={this.afterClickCheckbox.bind(this)}
            checked={this.state.targetable_ids.indexOf(id) >= 0} />
        },
        hideFilter: true,
        style: {textAlign: 'center'},
        sortable: false,
        width: 50
      }
    ];

    return (
      <div className='panel-task'>
        <div className='list-task'>
          <div className='col-md-12'>
            <ReactTable
              className='-striped -highlight'
              data={this.state.remain_tasks[type]}
              columns={columns} showFilters={true}
              defaultPageSize={react_table_ultis.defaultPageSize}
              defaultFilterMethod={react_table_ultis.defaultFilter}
            />
          </div>
        </div>
        <div className='text-center'>
          <button type='button' className='btn btn-primary'
            onClick={this.handleSubmitCreateTask.bind(this)}>
            {I18n.t('assignments.create_static_task')}
          </button>
        </div>
      </div>
    );
  }

  afterClickCheckbox(id, checked) {
    if (checked) {
      this.state.targetable_ids.push(id);
    } else {
      _.remove(this.state.targetable_ids, _id => _id == id);
    }
    this.setState({
      targetable_ids: this.state.targetable_ids
    });
  }

  handleSubmitCreateTask() {
    axios.post(routes.assign_tasks_url() + '.json', {
      task: {
        targetable_ids: this.state.targetable_ids,
        targetable_type: this.state.targetable_type,
        ownerable_id: this.props.ownerable_id,
        ownerable_type: this.props.ownerable_type,
        user_id: this.state.user_id
      }, authenticity_token: ReactOnRails.authenticityToken()
    })
    .then(response => {
      $('.modal-assign-task').modal('hide');
      this.props.handleAfterAssignTask(response.data.list_targets)
      this.setState({
        targetable_ids: []
      })
    })
    .catch(error => console.log(error));
  }

  afterCreateTask(target, type, owner) {
    this.props.afterCreateTask(target, type, owner)
  }
}
