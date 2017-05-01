import React from 'react';
import MetaTasks from './meta_tasks';

export default class ModalMetaTasks extends React.Component {
  render() {
    return (
      <div className='modal fade in modal-meta-tasks' role='dialog'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>
                {I18n.t('tasks.meta_tasks')}
              </h4>
            </div>

            <div className='modal-task'>
              <div className='modal-body'>
                <MetaTasks meta_tasks={this.props.meta_tasks} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
