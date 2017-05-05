import React from 'react';
import * as app_constants from 'constants/app_constants';
import FromCreateAssignment from '../../../assignments/actions/create';
import FormCreateSurvey from '../../../surveys/actions/create';
import * as routes from 'config/routes';

export default class ModalCreateTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta_types: props.meta_types,
      subject_detail: props.subject_detail,
      ownerable_id: props.ownerable_id,
      ownerable_type: props.ownerable_type,
      subject: props.subject,
      type: props.type
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      meta_types: nextProps.meta_types,
      subject_detail: nextProps.subject_detail,
      ownerable_id: nextProps.ownerable_id,
      ownerable_type: nextProps.ownerable_type,
      subject: nextProps.subject,
      type: nextProps.type
    })
  }

  render() {
    return (
      <div className='modal fade in modal-create-tasks' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content clearfix'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>
                {this.state.type}
              </h4>
            </div>

            <div className='modal-task'>
              <div className='modal-body'>
                {this._renderFormTasks(this.state.type)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  _renderFormTasks(type) {
    let url = routes.subject_tasks_url();

    if (type == "assignments") {
      return <FromCreateAssignment
        url={url}
        subject_detail={this.state.subject_detail}
        meta_types={this.state.meta_types}
        meta_types_checked={this.state.meta_types_checked}
        ownerable_id={this.state.ownerable_id}
        ownerable_type={this.state.ownerable_type}
        type='Assignment'
        subject={this.state.subject}
        permit_create_meta_type={true}
        handleAfterCreatedAssignment={this.handleAfterCreatedTasks.bind(this)}
      />
    } else if (type == 'surveys') {
      return <FormCreateSurvey
        url={url}
        subject_detail={this.state.subject_detail}
        ownerable_id={this.state.ownerable_id}
        ownerable_type={this.state.ownerable_type}
        type='Survey'
        handleAfterCreatedSurvey={this.handleAfterCreatedTasks.bind(this)}
      />
    } else if (type == "test_rules") {
      return ('')
    } else {
      return null;
    }
  }

  handleAfterCreatedTasks(target) {
    $('.modal-create-tasks').modal('hide');
    this.props.handleAfterCreatedTasks(target, this.state.type);
  }
}
