import axios from 'axios';
import CheckBox from './check_box'
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';
import * as table_constants from 'constants/griddle_table_constants';

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
    })
  }

  render() {
    let {type} = this.state;
    if(type != '') {
      const NewLayout = ({Table, Pagination, Filter}) => (
        <div className='col-md-12'>
          <div className='row'>
            <div className='griddle-head clearfix'>
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

      const ChooseTargetable = ({griddleKey}) => {
        let id;
        if (this.props.targetable_type == 'StaticTask') {
          id = this.state.remain_tasks[this.state.type][griddleKey].task_id
        } else {
          id = this.state.remain_tasks[this.state.type][griddleKey].id
        }
        return <CheckBox
          id={id}
          afterClickCheckbox={this.afterClickCheckbox.bind(this)}
          checked={this.state.targetable_ids.indexOf(id) >= 0} />
      }

      return (
        <div className='panel-task'>
          {this.state.remain_tasks[type].length > 0 ? (
            <div className='list-task'>
              <Griddle data={this.state.remain_tasks[type]}
                plugins={[plugins.LocalPlugin]}
                components={{Layout: NewLayout}}
                styleConfig={table_constants.styleConfig}>
                <RowDefinition keyColumn='id'>
                  <ColumnDefinition id='name'
                    title='name'/>
                  <ColumnDefinition id='content'
                    title='content' />
                  <ColumnDefinition id='action'
                    title='action' customComponent={ChooseTargetable} />
                  </RowDefinition>
              </Griddle>

            </div>
          ) : (<h3><i>{I18n.t('assignments.nothing_show', {list: type})}</i></h3>)}
          <div className='text-center'>

            <button type='button' className='btn btn-primary'
              onClick={this.handleSubmitCreateTask.bind(this)}>
              {I18n.t("assignments.create_static_task")}
            </button>
          </div>
        </div>
      )
    } else {
      return null
    }
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
    axios.post(routes.assign_tasks_url(), {
      task: {
        targetable_ids: this.state.targetable_ids,
        targetable_type: this.state.targetable_type,
        ownerable_id: this.props.ownerable_id,
        ownerable_type: this.props.ownerable_type,
        user_id: this.state.user_id
      }, authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
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
