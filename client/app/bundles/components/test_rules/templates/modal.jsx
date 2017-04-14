import React from 'react';
import Form from './form';

export default class Modal extends React.Component {
  render() {
    let form;
    if (this.props.test_rule.id) {
      form = (
        <Form
          test_rule={this.props.test_rule}
          url={this.props.url}
          handleAfterUpdated={this.handleAfterUpdated.bind(this)} />
      )
    } else {
      form = (
        <Form
          url={this.props.url} test_rule
          afterCreateTestRule={this.afterCreateTestRule.bind(this)} />
      )
    }

    return (
      <div className='modal fade in modalForm' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{this.props.title}</h4>
            </div>
            <div className='modal-body'>
              {form}
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterUpdated(test_rule) {
    this.props.handleAfterUpdated(test_rule);
  }
  afterCreateTestRule(test_rule) {
    this.props.afterCreateTestRule(test_rule);
  }
}
