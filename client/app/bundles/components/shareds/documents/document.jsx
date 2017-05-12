import Dropzone from 'react-dropzone';
import React from 'react';

export default class Document extends React.Component {
  render() {
    let {document} = this.props;
    let document_url = document.file ? document.file.url : '';
    let document_name = document_url ?
      document_url.substring(document_url.lastIndexOf('/') + 1) : '';
    return (
      <li className='document-item' key={document.id}>
        <div className='row'>
          <div className='col-md-7'>
            <a href={document_url} title={document_name} className='document-name'
              download={document_name} target='_blank'>
              {document_name}
            </a>
          </div>
          <div className='col-md-5'>
            <button
              onClick={this.handlerAfterClickPreviewDocument.bind(this, document)}
              className='pull-right btn btn-info btn-xs'>
              {I18n.t("buttons.preview")}
            </button>
          </div>
        </div>
      </li>
    );
  }

  handlerAfterClickPreviewDocument(document) {
    this.props.handlerAfterClickPreviewDocument(document);
  }
}
