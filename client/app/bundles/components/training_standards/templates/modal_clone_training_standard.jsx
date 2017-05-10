import axios from 'axios';
import Organizations from '../partials/organizations';
import React from 'react';

export default class ModalCloneTrainingStandard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props}
  }

  render() {
    return (
      <div className='modal fade in modal-clone-training-standard'
        role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'
                title={this.state.training_standard.name || ''}>
                {this.state.training_standard.name || ''}
              </h4>
            </div>
            <div className='modal-body'>
              <select className='form-control' ref='organizationField'
                name='organization'>
                {this.renderOrganizations()}
              </select>
            </div>
            <div className="modal-footer">
              <div className="col-md-3 col-md-offset-4">
                <button className="btn btn-success"
                  onClick={this.onSubmitClone.bind(this)}
                  title={I18n.t("training_standards.clone")}>
                  {I18n.t("training_standards.clone")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderOrganizations() {
    return this.props.cloneable_organizations.map(organization => {
      return (
        <option key={organization.id} value={organization.id} >
          {organization.name}
        </option>
        );
    });
  }

  onSubmitClone() {
    let selected_org_id = this.refs.organizationField.value;
    this.props.onSubmitClone(selected_org_id);
    $('.modal-clone-training-standard').modal('hide');
  }
}
