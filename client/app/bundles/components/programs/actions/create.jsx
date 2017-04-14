import axios from 'axios';
import React from 'react';

export default class Create extends React.Component {
  render() {
    return(
      <button type="submit" className="btn btn-primary"
        onClick={this.onClickCreateProgram.bind(this)}>
        {I18n.t("buttons.save")}
      </button>
    );
  }

  onClickCreateProgram(event) {
    event.preventDefault();
    let formData = new FormData();

    let attributes = this.props.attributes;

    for(let key of Object.keys(attributes)) {
      formData.append(this.props.params + '[' + key + ']', attributes[key]);
    }
    formData.append('authenticity_token', ReactOnRails.authenticityToken());
    axios({
      url: this.props.url,
      method: 'POST',
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
