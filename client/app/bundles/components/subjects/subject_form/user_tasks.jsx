import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as table_constants from 'constants/griddle_table_constants';

const TASKS_URL = app_constants.APP_NAME + app_constants.TASKS_PATH;

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
    if(this.state.type != '') {
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
      const buttonDelete = ({griddleKey}) => {
        let task = this.state.user_tasks[this.state.type][griddleKey];
        return(
          <div className='buttonDelete'>
            <button className='btn btn-danger'
              onClick={this.onClickDeleteTask.bind(this, task)}>{I18n.t('buttons.delete')}
            </button>
          </div>
        )
      }
      return(
        <div className='block-task col-md-12 clearfix'>
          <div className='box box-success'>
            <div className='box-body'>
              <Griddle data={this.state.user_tasks[this.state.type]}
                plugins={[plugins.LocalPlugin]}
                components={{Layout: NewLayout}}
                styleConfig={table_constants.styleConfig}>
                <RowDefinition>
                  <ColumnDefinition id='id'
                    title={I18n.t('subjects.headers.id')} />
                  <ColumnDefinition id='name'
                    title={I18n.t('subjects.headers.name')} />
                  <ColumnDefinition id='content'
                    title={I18n.t('subjects.headers.content')} />
                  <ColumnDefinition id='delete'
                    title={I18n.t('subjects.headers.delete')} customComponent={buttonDelete} />
                </RowDefinition>
              </Griddle>
            </div>
            <div className='clearfix'></div>
          </div>
          <div className='clearfix'></div>
        </div>
      )
    } else {
      return null
    }

  }
  onClickDeleteTask(task) {
    if (confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(TASKS_URL + '/' + task.task_id, {
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
