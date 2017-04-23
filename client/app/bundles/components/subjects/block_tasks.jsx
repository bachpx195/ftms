import axios from 'axios'
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import React from 'react'
import * as routes from 'config/routes';
import * as table_constants from 'constants/griddle_table_constants';

export default class BlockTasks extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tasks: this.props.tasks
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      tasks: nextProps.tasks
    });
  }

  render(){
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
      let task = this.state.tasks[griddleKey];
      return(
        <div className='buttonDelete'>
          <button className='btn btn-danger'
            onClick={this.onClickDeleteTask.bind(this, task)}>{I18n.t('buttons.delete')}
          </button>
        </div>
      )
    }

    return(
      <div className='block-task col-md-12'>
        <div className='box box-success'>
          <div className='box-body'>
            <Griddle data={this.state.tasks}
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
        </div>
      </div>
    )
  }
  onClickDeleteTask(task){
    if (confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(routes.task_url(task.task_id), {
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
}
