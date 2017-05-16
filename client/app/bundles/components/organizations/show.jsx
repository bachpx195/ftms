import _ from 'lodash';
import axios from 'axios';
import Documents from 'shared/documents/documents';
import FormOrganization from './templates/organization_form';
import ModalAssignOwner from './templates/modal_assign_owner/modal';
import ModalPreviewDocument from 'shared/modal_preview_document';
import OrganizationLists from './templates/render_organizations_in_show';
import React from 'react';
import ShowBreadCrumb from './templates/bread_crumbs/show';
import TitleOrganization from './templates/title_organization';
import OrganizationPolicy from 'policy/organization_policy';

import * as routes from 'config/routes';

require('../../assets/sass/show_organization.scss');

export default class OrganizationShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      organization: props.organization,
      programs: props.programs,
      all_roles: props.all_roles,
      documents: props.documents,
      document_preview: {},
      other_organizations: props.other_organizations
    }
  }

  render() {
    let owner = this.state.organization.owner;
    let count_users = (this.state.organization.users || []).length;
    let count_test_rules = (this.state.organization.test_rules || []).length;
    let count_training_standards = this.state.organization.training_standards.length;
    let count_courses = 0;
    for (let program of this.state.programs) {
      count_courses +=program.courses.length;
    }

    return (
      <div className='row organization-show'>
        <ShowBreadCrumb
          organization={this.state.organization}
          others={this.state.other_organizations}
        />
        <div className='col-md-9 content-list'>
          <div className='box box-primary'>
            <div className='box-header with-border'>

              <TitleOrganization
                organization={this.state.organization}
                handleAfter={this.handleAfter.bind(this)}
                programs={this.state.programs}
                handleAfterUpdated={this.handleAfterUpdated.bind(this)}
                />

            </div>
            <div className='box-body no-padding'>
              <div className='box-organization'>
                <div className='list-sub-organization'>
                  <OrganizationLists
                    organization={this.state.organization}
                    handleAfter={this.handleAfter.bind(this)}
                    programs={this.state.programs} />
                </div>
              </div>
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
                <OrganizationPolicy permit={[{action: ['ownerById'],
                  target: 'children', data: {id: owner.id}}]}
                >
                  <a href='#'
                    onClick={this.handleAssignOwnerModal.bind(this)} >
                    {I18n.t('organizations.assign_owner')}
                  </a>
                </OrganizationPolicy>
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
                  <a href={routes.organization_training_standards_url(
                    this.state.organization.id)}>
                    {I18n.t('organizations.num_training_standards')}
                  </a>
                </strong>
                <span className='badge label-primary'>
                  {count_training_standards}
                </span>
              </div>
              <br />
              <div className='member-title'>
                <i className='fa fa-bookmark'></i>
                <strong>
                  {I18n.t('organizations.num_courses')}
                </strong>
                <span className='badge label-primary'>
                  {count_courses}
                </span>
              </div>
              <br/>
              <div className='member-title'>
                <i className='fa fa-book' aria-hidden='true'></i>
                <strong>
                  <a href={routes.organization_subjects_url(
                    this.state.organization.id)}>
                    {I18n.t('organizations.num_subjects')}
                  </a>
                </strong>
                <span className='badge label-primary'>
                </span>
              </div>
              <br/>
              <div className='member-title'>
                <i className='fa fa-users' aria-hidden='true'></i>
                <strong>
                  <a href={routes.organization_members_url(
                    this.state.organization.id)}>
                    {I18n.t('organizations.manage_user')}
                  </a>
                </strong>
                <span className='badge label-primary'>
                  {count_users}
                </span>
              </div>
              <br />
              <div className='member-title'>
                <i className='fa fa-list-ul' aria-hidden='true'></i>
                <strong>
                  <a href={routes.organization_test_rules_url(
                    this.state.organization.id)}>
                    {I18n.t('organizations.test_rules')}
                  </a>
                </strong>
                <span className='badge label-primary'>
                  {count_test_rules}
                </span>
              </div>
              <br />
              <div className='member-title'>
                <i className='fa fa-file-code-o'></i>
                <strong>
                  <a href={routes.organization_exams_url(
                    this.state.organization.id)}>
                    {I18n.t('organizations.exams')}
                  </a>
                </strong>
              </div>
              <br />
              <div className='member-title'>
                <i className='fa fa-line-chart' aria-hidden='true'></i>
                <strong>
                  <a href={routes.organization_statistics_in_outs_url(
                    this.state.organization.id)}>
                    {I18n.t('sidebar.statistics.statistic')}
                  </a>
                </strong>
              </div>
            </div>
          </div>

          <Documents
            document_type={'Organization'}
            documents={this.state.documents}
            documentable={this.state.organization}
            handleDocumentUploaded={this.handleDocumentUploaded.bind(this)}
            handlerAfterClickPreviewDocument={this.handlerAfterClickPreviewDocument.bind(this)}
          />
        </div>

        <ModalPreviewDocument
          document_preview={this.state.document_preview}
          handleDocumentDeleted={this.handleDocumentDeleted.bind(this)}
        />

        <ModalAssignOwner
          organization={this.state.organization}
          handleOwnerAssigned={this.handleOwnerAssigned.bind(this)}
        />
      </div>
    )
  }

  handleAfter(organization, programs) {
    this.setState({
      organization: organization,
      programs: programs
    });
  }

  handleAfterUpdated(response) {
    $('.modalEditOrganization').modal('hide');
    this.state.organization.name = response.data.organization.name
    this.setState({
      organization: this.state.organization
    });
  }

  checkImage(event) {
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
          href={routes.user_url(owner.id)} >
          <img src={owner.avatar.url} className='img-circle' />
        </a>
      )
    }
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

  handlerAfterClickPreviewDocument(document) {
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
