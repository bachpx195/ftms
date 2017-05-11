import * as react_table_ultis from 'shared/react-table/ultis';
import * as routes from 'config/routes';
import axios from 'axios';
import css from 'assets/sass/react-table.scss';
import CheckBox from './check_box'
import React from 'react';
import ReactTable from 'react-table';

export default class ListTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: props.task,
      type: props.type,
      targetable_ids: [],
      user_id: props.user ? props.user.user_id : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      type: nextProps.type
    })
  }

  render() {
    let type = this.state.type;
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
    let buttonCreateTask = null;
    if (this.props.subject_detail.course_subject.status != 'finished' &&
      this.props.course.status != 'finished') {
      buttonCreateTask = (
        <div className='text-center'>
          <button type='button' className='btn btn-primary'
            onClick={this.handleSubmitCreateTask.bind(this)}>
            {I18n.t("assignments.create_static_task")}
          </button>
        </div>
      );
    }

    return(
      <div className='panel-task'>
        <div className='list-task'>
          <ReactTable className='-striped -highlight'
            data={this.state.task[type]} columns={columns} showFilters={true}
            defaultPageSize={react_table_ultis.defaultPageSize}
            defaultFilterMethod={react_table_ultis.defaultFilter}
          />
        </div>
        {buttonCreateTask}
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
    })
  }

  handleSubmitCreateTask() {
    axios.post(routes.assign_tasks_url() + '.json', {
      task: {
        targetable_ids: this.state.targetable_ids,
        targetable_type: this.props.targetable_type,
        ownerable_id: this.props.ownerable_id,
        ownerable_type: this.props.ownerable_type,
        user_id: this.state.user_id
      }, authenticity_token: ReactOnRails.authenticityToken()
    })
    .then(response => {
      if(this.state.user_id) {
        this.props.changePanel()
      } else {
        $('.modalAddTask').modal('hide');
        $('.modalUserTask').modal('hide');
      }
      this.props.handleAfterAddTask(this.state.type, this.state.targetable_ids,
        response.data.list_targets, this.props.subject_detail,
        this.state.user_id, this.props.user_index
      );
    })
    .catch(error => console.log(error));
  }

  afterCreateTask(target, type, owner) {
    this.props.afterCreateTask(target, type, owner)
  }
}
