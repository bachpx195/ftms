import axios from 'axios';
import React from 'react';
import * as routes from 'config/routes';
require('../../assets/sass/modal_preview_document.scss');

export default class ModalPreviewDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      document: props.document_preview
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      document: nextProps.document_preview
    });
  }

  renderFrame(extension) {
    if (extension.includes('doc')) {
      let encoded_url = encodeURIComponent(window.location.origin
        + this.state.document.file.url);
      let preview_url = 'https://view.officeapps.live.com/op/view.aspx?src='
        + encoded_url;
      return <iframe src={preview_url}
        className='frame-preview-document'/>
    } else {
      return <iframe src={this.state.document.file.url}
        className='frame-preview-document'/>
    }
  }

  render() {
    if (this.state.document.file && this.state.document.file.url) {
      let document_url = this.state.document.file.url;
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
                this.renderFrame(document_extension)
              }
              </div>
              <div className='modal-footer'>
                <button type="button" className="btn btn-sm btn-danger"
                  onClick={this.handleDeleteDocument.bind(this)}>
                  {I18n.t('buttons.delete')}
                </button>
                <a className="btn btn-sm btn-primary"
                  href={document_url} title={document_name}
                  download={document_name} target='_blank'>
                  {I18n.t('buttons.download')}
                </a>
                <button type="button" className="btn btn-sm btn-secondary"
                  data-dismiss="modal">
                  {I18n.t('buttons.close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='modal fade modal-preview-document' role='dialog'/>
      );
    }
  }

  handleDeleteDocument() {
    if (confirm(I18n.t("data.confirm_delete"))) {
      let document_url = routes.document_url(this.state.document.id);
      axios({
        url: document_url,
        method: 'DELETE',
        headers: {'Accept': 'application/json'},
        params: {authenticity_token: ReactOnRails.authenticityToken()}
      })
      .then(response => {
        this.props.handleDocumentDeleted(this.state.document);
        $('.modal-preview-document').modal('hide');
      })
      .catch(error => this.setState({errors: error.response.data.errors}));
      }
  }
}
