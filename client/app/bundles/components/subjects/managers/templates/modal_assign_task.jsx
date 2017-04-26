import React from 'react';
import ListTasks from './list_tasks';
import * as app_constants from 'constants/app_constants';

export default class ModalAssignAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remain_tasks: props.remain_tasks,
      type: props.type,
      ownerable_id: props.ownerable_id,
      ownerable_type: props.ownerable_type
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      type: nextProps.type
    })
  }

  render() {
    return (
      <div className={`modal fade in modal-assign-task`}
        role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>
                {I18n.t("subjects.assign", {type: this.props.type})}
              </h4>
            </div>

            <div className='modal-task'>
              <div className='modal-body'>
                <ListTasks
                  remain_tasks={this.state.remain_tasks}
                  type={this.state.type}
                  targetable_type={this.state.type}
                  ownerable_id={this.props.ownerable_id}
                  ownerable_type={this.props.ownerable_type}
                  handleAfterAssignTask={this.handleAfterAssignTask.bind(this)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  handleAfterAssignTask(list_targets) {
    let {type, remain_tasks} = this.state;
    list_targets.map(list_target => {
      let index = remain_tasks[type].findIndex(item => item.id == list_target.id);
      if (index > -1) {
        remain_tasks[type].splice(index, 1);
      }
    });
    this.props.handleAfterAssignTask(list_targets);
    this.setState({
      remain_tasks: remain_tasks
    })
  }
}
