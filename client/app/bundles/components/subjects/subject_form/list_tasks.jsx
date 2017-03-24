import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import * as table_constants from 'constants/griddle_table_constants';
import CheckBox from './check_box'
import FormTask from './form_task'
import * as app_constants from '../../../../constants/app_constants';
import * as subject_constants from '../subject_constants';

const TASK_URL = app_constants.APP_NAME + subject_constants.TASK_PATH;

export default class ListTasks extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      task: props.task,
      type: props.type,
      targetable_ids: [],
      course: props.course,
      user_id: props.user.user_id || ''
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      task: nextProps.task,
      type: nextProps.type,
      user_id: nextProps.user.user_id,
      targetable_ids: [],
      course: nextProps.course
    })
  }

  render(){
    let type = this.state.type;
    if(type != '') {
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
      const ChooseTargetable = ({griddleKey}) => {
        let id;
        if(this.props.targetable_type == 'StaticTask'){
          id = this.state.task[this.props.type][griddleKey].task_id
        }else{
          id = this.state.task[this.props.type][griddleKey].id
        }
        return <CheckBox id={id}
          afterClickCheckbox={this.afterClickCheckbox.bind(this)}
          checked={this.state.targetable_ids.indexOf(id) >= 0} />
      }
      let form_task ;
      if(this.state.type != 'assignments'){
        form_task = null;
      }else{
        form_task = (
          <FormTask type={this.state.type}
            ownerable_id={this.props.ownerable_id}
            ownerable_type={this.props.ownerable_type}
            afterCreateTask={this.afterCreateTask.bind(this)}
            subject_detail={this.props.subject_detail}
            course={this.props.course} user={this.props.user}/>
        )
      }
      return(
        <div className='panel-task'>
          <div className='create-task'>
            {form_task}
          </div>
          <div className='list-task'>
            <Griddle data={this.state.task[type]} plugins={[plugins.LocalPlugin]}
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
          <button type='button' className='btn btn-primary'
            onClick={this.afterSave.bind(this)}>
            {I18n.t('subjects.save_changes')}
          </button>
        </div>
      )
    } else {
      return null
    }
  }

  afterClickCheckbox(id, checked){
    if(checked) {
      this.state.targetable_ids.push(id);
    } else {
      _.remove(this.state.targetable_ids, _id => _id == id);
    }
    this.setState({
      targetable_ids: this.state.targetable_ids
    })
  }

  afterSave(){
    let ownerable_name = '';
    if(this.props.course) {
      ownerable_name = 'CourseSubject';
    } else {
      ownerable_name = 'Subject';
    }
    axios.post(TASK_URL, {
      task: {
        targetable_ids: this.state.targetable_ids,
        targetable_type: this.props.targetable_type,
        ownerable_id: this.props.ownerable_id,
        ownerable_type: this.props.ownerable_type,
        user_id: this.state.user_id
      }, authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      $('#modalAddTask').modal('hide');
      $('#modalUserTask').modal('hide');
      this.props.handleAfterAddTask(this.state.type, this.state.targetable_ids,
        response.data.list_targets, this.props.subject_detail, this.state.user_id
      );
    })
    .catch(error => console.log(error));
  }
  afterCreateTask(target, type){
    this.props.afterCreateTask(target, type)
  }
}
