import axios from 'axios';
import Document from './document';
import Dropzone from 'react-dropzone';
import React from 'react';
import * as routes from 'config/routes';
import * as app_constants from 'constants/app_constants';

export default class Documents extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      documents: props.documents,
      documentable: props.documentable,
      document_type: props.document_type
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      documents: nextProps.documents
    });
  }

  render() {
    return (
      <div className='box box-primary'>
        <div className='box-header with-border box-header-gray'>
          <h3 className='label box-title'>
            {I18n.t("documents.title")}
          </h3>
          <div className="pull-right">
            <button type="button" className="btn btn-default"
              onClick={this.handleUploadDocument.bind(this)}
              title={I18n.t("documents.select_document")}>
              <i className="fa fa-upload"></i>
            </button>
            <form encType="multipart/form-data">
              <div className='hidden'>
                <Dropzone onDrop={this.onDocumentsDrop.bind(this)}
                  ref='dropzoneDocumentsField'
                  multiple={false}
                  accept={app_constants.ACCEPT_DOCUMENT_TYPES} />
              </div>
            </form>
          </div>
        </div>
        <div className='box-body'>
          <ul className='document-list clearfix'>
            {
              this.state.documents.map((document, index) => {
                return (
                  <Document
                    key={document.id}
                    document={document}
                    handlerAfterClickPreviewDocument={this.props.handlerAfterClickPreviewDocument}
                  />
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }

  handleUploadDocument() {
    this.refs.dropzoneDocumentsField.open();
  }

  onDocumentsDrop(acceptedFiles, rejectedFiles) {
    if (app_constants.isOverMaxDocumentSize(acceptedFiles[0])) {
      return;
    }
    let formData = new FormData();
    formData.append('document[documentable_id]', this.state.documentable.id);
    formData.append('document[documentable_type]', this.state.document_type);
    formData.append('document[file]', acceptedFiles[0]);
    formData.append('authenticity_token', ReactOnRails.authenticityToken());

    let url = routes.documents_url();

    axios({
      url: url,
      method: 'POST',
      data: formData,
      headers: {'Accept': 'application/json'}
    })
    .then(response => {
      this.props.handleDocumentUploaded(response.data.document);
    })
    .catch(error => {
      console.log(error);
    });
  }

  renderDocument(document) {
    let document_url = document.file.url;
    let document_name =
      document_url.substring(document_url.lastIndexOf('/') + 1);

    return (
      <li className='document-item' key={document.id}>
        <span className='direct-document'>
          <a href={document_url} title={document_name} className='document-name'
            download={document_name} target='_blank'>
            {document_name}
          </a>
        </span>
        <div className='pull-right preview-document-button'>
          <button
            onClick={this.handlerAfterClickPreviewDocument.bind(this, document)}
            className='pull-right btn btn-info btn-xs'>
            {I18n.t("buttons.preview")}
          </button>
        </div>
      </li>
    );
  }

  handlerAfterClickPreviewDocument(document) {
    this.props.handlerAfterClickPreviewDocument(document);
    $('.modal-preview-document').modal();
  }
}
