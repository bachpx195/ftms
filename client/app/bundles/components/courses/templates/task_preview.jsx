import React from 'react';

export default class TaskPreview extends React.Component {
  render() {
    let render_task = null;
    if(this.props.targetable_type == 'Survey') {
      render_task = (
        <div>
          <strong>{this.props.current_item.name}</strong>
          <div>{this.props.current_item.content}</div>
        </div>
      )
    } else {
      render_task = (
        <div>
          <strong>{this.props.current_item.name}</strong><br/>
          <span>{I18n.t('courses.modals.count_question', 
            {total_question: this.props.current_item.total_question || ''})}
          </span><br/>
          <span>{I18n.t('courses.modals.time_of_test', 
            {time_of_test: this.props.current_item.time_of_test || ''})}
          </span><br/>
          <span>{I18n.t('courses.modals.min_score_for_pass', 
            {min_score: this.props.current_item.min_score_for_pass || ''})}
          </span>
        </div>
      )
    }
    return (
      <div className='task-preview col-md-6'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            {I18n.t('courses.modals.task_preview')}
          </div>
          <div className='panel-body'>
            {render_task}
          </div>
        </div>
      </div>
    );
  }
}
