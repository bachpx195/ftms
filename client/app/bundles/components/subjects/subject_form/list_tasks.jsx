import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import * as table_constants from 'constants/griddle_table_constants';
import CheckBox from './check_box'

import * as app_constants from '../../../../constants/app_constants';
import * as subject_constants from '../subject_constants';

const TASK_URL = app_constants.APP_NAME + subject_constants.TASK_PATH;

export default class ListProjects extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      task: props.task,
      type: props.type,
      targetable_ids: []
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      task: nextProps.task,
      type: nextProps.type,
      targetable_ids: []
    })
  }

  render(){
    let type = this.state.type;
    if(type != "") {
      const NewLayout = ({Table, Pagination, Filter}) => (
        <div className="col-md-12">
          <div className="row">
            <div className="griddle-head clearfix">
              <div className="col-md-6">
                <Filter />
              </div>
              <div className="col-md-6 text-right">
                <Pagination />
              </div>
            </div>
            <div className="col-md-12">
              <Table />
            </div>
          </div>
        </div>
      );
      const ChooseTargetable = ({griddleKey}) => {
        let id = this.state.task[type][griddleKey].id;
        return <CheckBox id={id}
          afterClickCheckbox={this.afterClickCheckbox.bind(this)}
          checked={this.state.targetable_ids.indexOf(id) >= 0} />
      }

      return(
        <div className='panel-project'>
          <Griddle data={this.state.task[type]} plugins={[plugins.LocalPlugin]}
            components={{Layout: NewLayout}}
            styleConfig={table_constants.styleConfig}>
            <RowDefinition keyColumn="id">
              <ColumnDefinition id="name"
                title='name'/>
              <ColumnDefinition id="content"
                title='content' />
              <ColumnDefinition id="action"
                title='action' customComponent={ChooseTargetable} />
              </RowDefinition>
          </Griddle>
          <button type="button" className="btn btn-primary"
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
    axios.post(TASK_URL, {
      task: {
        targetable_ids: this.state.targetable_ids,
        targetable_type: this.state.type,
        ownerable_id: this.props.subject_id,
        ownerable_type: 'Subject'
      }, authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      $('#modalAddTask').modal('hide');
      this.props.handleAfterAddTask(this.state.type, this.state.targetable_ids,
        response.data.list_tasks, this.props.subject_detail
      );
    })
    .catch(error => console.log(error));
  }
}
