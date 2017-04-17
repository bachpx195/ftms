import React from 'react';
import CoursePolicy from 'policy/course_policy';
import Dropzone from 'react-dropzone';

import * as app_constants from 'constants/app_constants';

export default class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: props.documents
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      documents: nextProps.documents
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
            onClick={this.clickPreviewDocument.bind(this, document)}
            className='pull-right btn btn-info btn-xs'>
            {I18n.t("buttons.preview")}
          </button>
        </div>
      </li>
    );
  }

  render() {
    return (
      <div className='info-panel clearfix'>
        <div className='box box-primary'>
          <div className='box-header with-border box-header-gray'>
            <h3 className='label box-title'>
              {I18n.t("documents.title")}
            </h3>
            <CoursePolicy permit={this.props.courseListPermit} >
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
            </CoursePolicy>
          </div>
          <div className='box-body'>
            <ul className='document-list clearfix'>
              {
                this.state.documents.map((document, index) => {
                  return this.renderDocument(document);
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
    this.props.onDocumentsDrop(acceptedFiles, rejectedFiles);
  }

  handleDocumentUploaded(document) {
    this.props.handleDocumentUploaded(document);
  }

  handleDocumentDeleted(document) {
    this.props.handleDocumentDeleted(document);
  }

  clickPreviewDocument(document) {
    this.props.clickPreviewDocument(document);
  }
}
