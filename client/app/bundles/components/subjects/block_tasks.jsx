import * as react_table_ultis from 'shared/react-table/ultis';
import * as routes from 'config/routes';
import axios from 'axios';
import css from 'assets/sass/react-table.scss';
import React from 'react'
import ReactTable from 'react-table';

export default class BlockTasks extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tasks: this.props.tasks || []
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      tasks: nextProps.tasks || []
    });

    $('.modal-create-' + this.props.type).modal('hide');
  }

  render(){
    const columns = [
      {
        header: '#',
        accessor: 'position',
        render: row => <div className='text-right'>{row.index + 1}</div>,
        hideFilter: true,
        width: 50
      },
      {
        header: I18n.t('subjects.headers.name'),
        accessor: 'name',
        render: row => <a href={routes.task_url(row.row.id)}>{row.value}</a>
      },
      {
        header: I18n.t('subjects.headers.content'),
        accessor: 'content',
        render: row => <span title={row.value}>{row.value}</span>
      },
      {
        header: '',
        accessor: 'delete',
        render: ({row}) => {
          return (
            <button className='btn btn-danger'
              title={I18n.t('buttons.delete')}
              onClick={this.onClickDeleteTask.bind(this, row)}>
                <i className='fa fa-trash'></i>
            </button>
          );
        },
        sortable: false,
        hideFilter: true,
        style: {textAlign: 'center'},
        width: 75
      },
    ];

    return(
      <div className='block-task col-md-12'>
        <div className='box box-success'>
          <div className='box-body'>
            {this._renderActionCreate(this.props.type)}
            <ReactTable
              className='-striped -highlight' data={this.state.tasks}
              columns={columns} showFilters={true}
              defaultPageSize={react_table_ultis.defaultPageSize}
              defaultFilterMethod={react_table_ultis.defaultFilter}
            />
          </div>
        </div>
      </div>
    )
  }

  onClickDeleteTask(task){
    if (confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(routes.assign_task_url(task.task_id), {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        this.props.handleAfterDeleteTask(task.task_id, task, this.props.type)
      })
      .catch(error => console.log(error));
    }
  }

  _renderActionCreate(type) {
    let button_create = '';
    if (this.props.location == 'course_subject' && type == 'projects') {
      button_create = '';
    } else {
      button_create =
      <button className='btn btn-primary pull-right'
        onClick={this.handleClickCreateTask.bind(this)}>
        {I18n.t('subjects.create.' + type)}
        </button>
    }

    return (
      <div className='action-create-task clearfix'>
        {button_create}
        {type != 'projects' ? (
          <button className='btn btn-primary pull-right'
            onClick={this.handleClickAssignTask.bind(this)}>
            {I18n.t('subjects.assigns.' + type)}</button>
        ) : ('')}
      </div>
    );

  }

  handleClickCreateTask(event) {
    this.props.handleChooseType(this.props.type)
    $('.modal-create-tasks').modal();
  }

  handleClickAssignTask(event) {
    this.props.handleChooseType(this.props.type)
    $('.modal-assign-task').modal();
  }
}
