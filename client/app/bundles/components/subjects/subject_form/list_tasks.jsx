import axios from 'axios';
import CheckBox from './check_box'
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import React from 'react';
import * as app_constants from 'constants/app_constants';
import * as routes from 'config/routes';
import * as table_constants from 'constants/griddle_table_constants';

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
          id = this.state.task[this.props.type][griddleKey].task_id
        } else {
          id = this.state.task[this.props.type][griddleKey].id
        }
        return <CheckBox
          id={id}
          afterClickCheckbox={this.afterClickCheckbox.bind(this)}
          checked={this.state.targetable_ids.indexOf(id) >= 0} />
      }

      return(
        <div className='panel-task'>
          {this.state.task[type].length > 0 ? (
            <div className='list-task'>
              <Griddle data={this.state.task[type]}
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
        targetable_type: this.props.targetable_type,
        ownerable_id: this.props.ownerable_id,
        ownerable_type: this.props.ownerable_type,
        user_id: this.state.user_id
      }, authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
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
