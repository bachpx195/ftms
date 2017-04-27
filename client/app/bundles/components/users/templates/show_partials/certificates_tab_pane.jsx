import Certificate from "../../../certificates/show";
import React from 'react';

export default class CertificatesTabPane extends React.Component {
  renderCertificate() {
    return (
      this.props.certificates.map(item => {
        return (
          <div key={item.id}>
            <Certificate user_id={this.props.user_id}
              username={this.props.username}
              certificate={item} />
          </div>
        );
      })
    );
  }

  render() {
    return (
      <div className='tab-pane certificates-container clearfix'
        id='certificates'>
        {this.renderCertificate()}
      </div>
    );
  }
}
