import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import FormCreate from './form_create';
import OrganizationLists from './organization_lists';
import BoxTitle from './box_title';
import ModalPreviewDocument from '../shareds/modal_preview_document';
import ModalAssignOwner from './modal_assign_owner/modal';
import Dropzone from 'react-dropzone';

import * as app_constants from 'constants/app_constants';
import * as user_constants from '../users/user_constants';
import * as exam_constants from '../exams/constants/exam_constants';

const USER_URL = app_constants.APP_NAME + user_constants.USER_PATH;

const ORGANIZATION_URL = app_constants.APP_NAME + 'organizations';
require('../../assets/sass/show_organization.scss');

export default class OrganizationBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      organization: {},
      programs: [],
      all_roles: [],
      parent: null,
      user: this.props.user,
      documents: [],
      document_preview: {}
    }
  }

  componentWillMount(){
    this.fetchOrganization()
  }

  fetchOrganization() {
    if(this.props.organization){
      const url = ORGANIZATION_URL + '/' + this.props.organization.id
      axios.get(url + '.json')
      .then(response => {
        this.setState({
          organization: response.data.organization,
          programs: response.data.programs,
          all_roles: response.data.all_roles,
          documents: response.data.organization.documents
        })
      })
    }
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

  renderDocuments() {
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
                  return this.renderDocument(document);
                })
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }

  render() {
    let owner = this.state.organization.owner;
    let count_users = (this.state.organization.users || []).length;
    let count_training_standards = 0;
    let count_courses = 0;
    for(let program of this.state.programs){
      count_training_standards += this.state.organization.training_standards.length;
      count_courses +=program.courses.length;
    }

    let ORGANIZATION_MEMBERS_URL = ORGANIZATION_URL + '/' +
      this.state.organization.id + '/' + 'users';
    let ORGANIZATION_EXAMS_URL = ORGANIZATION_URL + '/' +
      this.state.organization.id + '/' + exam_constants.EXAMS_PATH;

    return (
      <div className='row'>
        <div className='col-md-9'>
          <div className='box box-success'>
            <div className='box-header with-border'>
              <BoxTitle organization={this.state.organization}
                handleAfter={this.handleAfter.bind(this)}
                programs={this.state.programs}/>
              <div className='box-tools pull-right'>
                <button type='button' className='btn btn-box-tool'
                  data-widget='collapse'>
                  <i className='fa fa-minus'></i>
                </button>
                <button type='button' className='btn btn-box-tool'
                  data-widget='remove'>
                  <i className='fa fa-times'></i>
                </button>
              </div>
            </div>
            <div className='box-body no-padding'>
              {this.renderBoxOrganization()}
            </div>
          </div>
        </div>
        <div className='col-md-3 info-panel'>
          <div className='box box-primary'>
            <div className='box-header with-border'>
              <h3 className='box-title'>
                <strong>{I18n.t('organizations.titles.info')}</strong>
              </h3>
            </div>
            <div className='box-body'>
              <div className='member-title'>
                <i className='fa fa-user-circle-o' aria-hidden='true'></i>
                <strong>
                  {I18n.t('organizations.owners')}
                </strong>
                <div className='block-trainer'>
                  {this.renderOwner(owner)}
                </div>
                <a href="#"
                  onClick={this.handleAssignOwnerModal.bind(this)} >
                  {I18n.t('organizations.assign_owner')}
                </a>
              </div>
              <br />
              <div className='member-title'>
                <i className='fa fa-graduation-cap' aria-hidden='true'></i>
                <strong>
                  {I18n.t('organizations.num_programs')}
                </strong>
                <span className='badge label-primary'>
                  {this.state.programs.length}
                </span>
              </div>
              <br />
              <div className='member-title'>
                <i className='fa fa-certificate' aria-hidden='true'></i>
                <strong>
                  {I18n.t('organizations.num_training_standards')}
                </strong>
                <span className='badge label-primary'>
                  {count_training_standards}
                </span>
              </div>
              <br />
              <div className='member-title'>
                <i className='fa fa-book' aria-hidden='true'></i>
                <strong>
                  {I18n.t('organizations.num_courses')}
                </strong>
                <span className='badge label-primary'>
                  {count_courses}
                </span>
              </div>
              <br/>
              <div className='member-title'>
                <i className='fa fa-users' aria-hidden='true'></i>
                <strong>
                  <a href={ORGANIZATION_MEMBERS_URL}>
                    {I18n.t('organizations.manage_user')}
                  </a>
                </strong>
                <span className='badge label-primary'>
                  {count_users}
                </span>
              </div>
              <br />
              <div className='member-title'>
                <i className='fa fa-check-square-o'></i>
                <strong>
                  <a href={ORGANIZATION_EXAMS_URL}>
                    {I18n.t('organizations.exams')}
                  </a>
                </strong>
              </div>
            </div>
          </div>
        </div>
        {
          this.renderDocuments()
        }
        <ModalPreviewDocument
          document_preview={this.state.document_preview}
          handleDocumentDeleted={this.handleDocumentDeleted.bind(this)}
        />
        <ModalAssignOwner
          organization={this.state.organization}
          all_roles={this.state.all_roles}
          handleOwnerAssigned={this.handleOwnerAssigned.bind(this)}
        />
      </div>
    )
  }

  renderBoxOrganization(){
    if(this.props.organization){
      return(
        <div className='box-organization'>
          <div className='list-sub-organization'>
            <OrganizationLists organization={this.state.organization}
              handleAfter={this.handleAfter.bind(this)}
              programs={this.state.programs}/>
          </div>
        </div>
      )
    }else{
      return(
        <div className='box-organization'>
          <div className='form-create'>
            <FormCreate parent={this.state.parent} url={ORGANIZATION_URL}
              user_id={this.props.user} />
          </div>
        </div>
      )
    }
  }

  handleAfter(organization, programs) {
    this.setState({
      organization: organization,
      programs: programs
    });
  }

  checkImage(event){
    let target = event.target;
    $(target).attr('src', '/assets/image_found.png')
  }

  handleClick() {
    let $target = $(event.target);
    $target.blur();
    $('#modalMember').modal();
  }

  renderOwner(owner) {
    if (!_.isEmpty(owner)) {
      return(
        <a className='image'
          onError={this.checkImage.bind(this)}
          title={owner.name}
          href={USER_URL + owner.id} >
          <img src={owner.avatar.url} className='img-circle' />
        </a>
      )
    }
  }

  handleUploadDocument() {
    this.refs.dropzoneDocumentsField.open();
  }

  onDocumentsDrop(acceptedFiles, rejectedFiles) {
    if (app_constants.isOverMaxDocumentSize(acceptedFiles[0])) {
      return;
    }
    let formData = new FormData();
    formData.append('document[documentable_id]', this.state.organization.id);
    formData.append('document[documentable_type]', 'Organization');
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
      this.handleDocumentUploaded(response.data.document);
    })
    .catch(error => this.setState({errors: error.response.data.errors}));
  }

  handleDocumentUploaded(document) {
    this.state.documents.push(document);
    this.setState({documents: this.state.documents});
  }

  handleDocumentDeleted(document) {
    this.setState({
      documents: this.state.documents.filter(item => item.id != document.id)
    });
  }

  clickPreviewDocument(document) {
    this.setState({document_preview: document});
    $('.modal-preview-document').modal();
  }

  handleAssignOwnerModal(event) {
    event.preventDefault();
    $('.modal-assign-owner').modal();
  }

  handleOwnerAssigned(owner) {
    this.state.organization.owner = owner;
    this.setState({
      organization: this.state.organization
    });
  }
}
