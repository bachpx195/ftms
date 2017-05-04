import React from 'react';

export default class TrainingStandardPreview extends React.Component {
  render() {
    let render_task = null;
    render_task = (
      <div>
        <strong>{this.props.current_item.name}</strong><br/>
        <span>{this.props.current_item.description}
        </span><br/>
      </div>
    )
    return (
      <div className='col-md-6'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            {I18n.t('training_standards.preview')}
          </div>
          <div className='panel-body'>
            {render_task}
          </div>
        </div>
      </div>
    );
  }
}
