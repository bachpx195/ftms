import axios from 'axios';
import React from 'react';

export default class Update extends React.Component {
  render() {
    return (
      <button type="submit" className="btn btn-primary"
        onClick={this.onSubmitUpdate.bind(this)}>
        <i className="fa fa-pencil-square-o"></i>
        &nbsp;{I18n.t('buttons.edit')}
      </button>
    );
  }

  onSubmitUpdate(event) {
    event.preventDefault();
    let formData = new FormData();

    let attributes = this.props.attributes;

    for(let key of Object.keys(attributes)) {
      formData.append(this.props.params + '[' + key + ']', attributes[key]);
    }

    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    axios({
      url: this.props.url,
      method: 'PUT',
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      $('.modalEdit').modal('hide');
      this.props.handleAfterUpdated(response);
    })
    .catch(error => {
      console.log(error);
    });
  }
}
