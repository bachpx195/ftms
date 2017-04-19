import axios from 'axios';
import Form from './form';
import Organizations from '../partials/organizations';
import React from 'react';

export default class ModalShareTrainingStandard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props,
      select_organizations: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  render() {
    return (
      <div className='modal fade in modal-share-training-standard'
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
              <Organizations
                training_standard={this.state.training_standard}
                selected_organizations={this.props.selected_organizations}
                chooseOrganization={this.chooseOrganization.bind(this)}
                select_organizations={this.state.select_organizations}
              />
            </div>
            <div className="modal-footer">
              <div className="col-md-3 col-md-offset-4">
                <button className="btn btn-success"
                  onClick={this.onSubmitShareTrainingStandard.bind(this)}
                  title={I18n.t("training_standards.share")}>
                  {I18n.t("training_standards.share")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onSubmitShareTrainingStandard() {
    this.props.handleAfterShareTrainingStandard(this.state.select_organizations);
    this.setState({
      select_organizations: []
    });
    $('.modal-share-training-standard').modal('hide');
  }

  chooseOrganization(select_organizations) {
    this.setState({
      select_organizations: select_organizations
    });
  }
}
