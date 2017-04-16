import axios from 'axios';
import Form from '../templates/form';
import React from 'react';
import * as app_constants from 'constants/app_constants';

export default class ModalCreateStandard extends React.Component {
  render() {
    return (
      <div id="modalCreateStandards" className="modal fade in" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close"
                data-dismiss="modal">&times;</button>
              <h4 className="modal-title">
                {I18n.t("training_standards.create")}
              </h4>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmitCreateStandard.bind(this)}>
                <div className="form-group">
                  <input type="text" placeholder={I18n.t("training_standards.headers.name")}
                    className="form-control" name="name" ref="nameField" />
                </div>
                <div className="form-group">
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">{I18n.t("buttons.save")}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleSubmitCreateStandard(event) {
    event.preventDefault();
    axios.post(this.props.standard_url, {
      training_standard: {
        name: this.refs.nameField.value
      }, authenticity_token: ReactOnRails.authenticityToken()
    }, app_constants.AXIOS_CONFIG)
    .then(response => {
      let {training_standard} = response.data;
      this.props.handleAfterCreatedStandard(training_standard)
      $('#modalCreateStandards').modal('hide');
      this.refs.nameField.value = ''
      window.location.href = this.props.standard_url + '/' + training_standard.id;
    })
    .catch(error => {
      console.log(error);
    });
  }
}
