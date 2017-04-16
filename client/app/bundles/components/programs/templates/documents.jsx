import axios from 'axios';
import Dropzone from 'react-dropzone';
import Document from './render_document';
import React from 'react';
import * as app_constants from 'constants/app_constants';

export default class Documents extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      program_detail: props.program_detail,
      documents: props.documents
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      documents: nextProps.documents
    })
  }

  render() {
    return (
      <div className='col-md-3 info-panel'>
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
                  return(
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
    formData.append('document[documentable_id]', this.state.program_detail.id);
    formData.append('document[documentable_type]', 'Program');
    formData.append('document[file]', acceptedFiles[0]);
    formData.append('authenticity_token', ReactOnRails.authenticityToken());

    let url = app_constants.APP_NAME + 'documents';

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
}
