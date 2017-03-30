import React from 'react';
import Form from './form';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requirements: props.requirements,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      requirements: nextProps.requirements,
    });
  }

  render() {
    return (
      <div id={'modalRequirement'} className='modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>
                {I18n.t('courses.modals.header_edit')}
              </h4>
            </div>
            <div className='modal-body'>
              <Form requirement={this.props.requirement}
                url={this.props.url}
                handleAfterEdit={this.handleAfterUpdate.bind(this)}
                handleAfterSubmit={this.handleAfterSubmit.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleAfterUpdate(update_requirement) {
    let index = this.state.requirements
      .findIndex(requirement => requirement.id === update_requirement.id);
    this.state.requirements[index] = update_requirement;
    this.props.handleAfterCreate(this.state.requirements);
  }

  handleAfterSubmit(new_requirement) {
    this.state.requirements.push(new_requirement);
    this.props.handleAfterCreate(this.state.requirements);
  }
}
