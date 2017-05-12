import React from 'react';
import * as app_constants from 'constants/app_constants';
import FormCreateAssignment from '../../../assignments/actions/create';


export default class ModalCreateAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta_types: props.meta_types,
      meta_types_checked: []
    }
  }

  render() {
    return (
      <div className='modal fade in modal-create-assignments' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content clearfix'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>
                {I18n.t("assignments.create_assignment")}
              </h4>
            </div>

            <div className='modal-task'>
              <div className='modal-body'>
                <FormCreateAssignment
                  url={this.props.url}
                  subject_detail={this.props.subject_detail}
                  meta_types={this.state.meta_types}
                  meta_types_checked={this.state.meta_types_checked}
                  ownerable_id={this.props.ownerable_id}
                  ownerable_type={this.props.ownerable_type}
                  type='Assignment'
                  subject={this.props.subject}
                  permit_create_meta_type={this.props.permit_create_meta_type}
                  handleAfterCreatedAssignment={this.handleAfterCreatedAssignment.bind(this)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  handleAfterCreatedAssignment(target) {
    this.setState({
      meta_types_checked: []
    });
    $('.modal-create-assignments').modal('hide');
    this.props.handleAfterCreatedAssignment(target);
  }
}
