import React from 'react';
import axios from 'axios';
require('../sass/modal_preview_document.scss');

import * as app_constants from 'constants/app_constants';

export default class ModalPreviewDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      document: props.document,
      document_preview: props.document_preview
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      document: nextProps.document,
      document_preview: nextProps.document_preview
    });
  }

  renderFrame(extension, should_render) {
    if (should_render) {
      if (extension.includes('doc')) {
        let encoded_url = encodeURIComponent(window.location.origin
          + this.state.document.url);
        let preview_url = 'https://view.officeapps.live.com/op/view.aspx?src='
          + encoded_url;
        return <iframe src={preview_url}
          className='frame-preview-document'/>
      } else {
        return <iframe src={this.state.document.url}
          className='frame-preview-document'/>
      }
    }
  }

  render() {
    if (this.state.document && this.state.document.url) {
      let document_url = this.state.document.url;
      let document_name =
        document_url.substring(document_url.lastIndexOf('/') + 1);
      let document_extension =
        document_url.substring(document_url.lastIndexOf('.') + 1);

      return (
        <div className='modal fade modal-preview-document' role='dialog'>
          <div className='modal-dialog modal-lg' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <button type='button' className='close'
                  data-dismiss='modal'>&times;</button>
                <h4>{document_name}</h4>
              </div>
              <div className='modal-body'>
              {
                this.renderFrame(document_extension,
                  this.state.document_preview)
              }
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div/>;
    }
  }
}
