import React from 'react';
import axios from 'axios';

export default class FormMetaTask extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      meta_type: props.meta_type,
      meta_task: {
        id: props.meta_task.id || '',
        title: props.meta_task.title || '',
        value: props.meta_task.value || ''
      }
    }
  }

  render() {
    return (
      <div className='form-send-pull'>
        <label>{this.state.meta_type.name} Link</label>
        <input type='value'
          placeholder={I18n.t('meta_tasks.placeholder_link')}
          className='form-control' name='value' ref="link_pull"
          value={this.state.meta_task.value}
          onChange={this.onChange.bind(this)}
        />
      </div>
    )
  }

  onChange(event) {
    this.state.meta_task.title = this.state.meta_type.name;
    this.state.meta_task.value = event.target.value;
    this.setState({
      meta_task: this.state.meta_task
    });
    this.props.afterOnChangeInput(this.state.meta_task);
  }

}
