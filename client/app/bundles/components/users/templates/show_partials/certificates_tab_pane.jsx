import Certificate from "../../../certificates/show";
import React from 'react';

export default class CertificatesTabPane extends React.Component {
  render() {
    return (
      <div className='tab-pane certificates-container clearfix'
        id='certificates'>
        <Certificate user={this.props.user}/>
      </div>
    );
  }
}
