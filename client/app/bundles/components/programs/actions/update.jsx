import axios from 'axios';
import React from 'react';

export default class Update extends React.Component {
  render() {
    return(
      <button type="submit" className="btn btn-primary"
        onClick={this.onClickCreateProgram.bind(this)}>
        {I18n.t("buttons.edit")}
      </button>
    );
  }

  onClickCreateProgram(event) {
    event.preventDefault();
    let formData = new FormData();

    let attribute = this.props.attribute;

    for(let key of Object.keys(attribute)) {
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
      this.props.handleAfterCreated(response);
    })
    .catch(error => {
      console.log(error);
    });
  }
}
