import React, { PropTypes } from 'react';
import * as app_constants from 'constants/app_constants';
import * as dashboard_constands from './dashboard_constands';

const LANGUAGES_URL = app_constants.APP_NAME + dashboard_constands.LANGUAGES_PATH;
const ORGANIZATIONS_URL = app_constants.APP_NAME +
  dashboard_constands.ORGANIZATIONS_PATH;
const STAGES_URL = app_constants.APP_NAME + dashboard_constands.STAGES_PATH;
const ADMIN_SUBJECTS_URL = app_constants.APP_NAME + dashboard_constands.ADMIN_SUBJECTS_PATH;
const ADMIN_TRAINEE_TYPES_URL = app_constants.APP_NAME +
  dashboard_constands.ADMIN_TRAINEE_TYPES_PATH;
const TRAINING_STANDARDS_URL = app_constants.APP_NAME +
  dashboard_constands.TRAINING_STANDARDS_PATH;
const ADMIN_UNIVERSITIES_URL = app_constants.APP_NAME +
  dashboard_constands.ADMIN_UNIVERSITIES_PATH;
const FUNCTIONS_URL = app_constants.APP_NAME +
  dashboard_constands.ADMIN_FUNCTIONS_PATH;
const ROLES_URL = app_constants.APP_NAME +
  dashboard_constands.ROLES_PATH;


export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    if(!localStorage.getItem('page')) {
      localStorage.setItem('page', 'languages');
    }

    if(localStorage.getItem('roles_menu'))
      this.state = {roles_menu: localStorage.getItem('roles_menu')};
    else
      this.state = {roles_menu: 'hiddened'};
  }

  render () {
    return (
      <aside className='main-sidebar'>
        <section className='sidebar'>
          <ul className='sidebar-menu td-admin-sidebar'>
            <li className='active' data-page='languages'>
              <a href={LANGUAGES_URL} onClick={this.onClick.bind(this)}>
                <i className='fa fa-book'></i>
                <span>{I18n.t('sidebar.languages')}</span>
              </a>
            </li>

            <li data-page='organizations'>
              <a href={ORGANIZATIONS_URL} onClick={this.onClick.bind(this)}>
                <i className='fa fa-folder'></i>
                <span>{I18n.t('sidebar.organizations')}</span>
              </a>
            </li>

            <li data-page='stages'>
              <a href={STAGES_URL} onClick={this.onClick.bind(this)}>
                <i className='fa fa-dashboard'></i>
                <span>{I18n.t('sidebar.stages')}</span>
              </a>
            </li>

            <li data-page='subjects'>
              <a href={ADMIN_SUBJECTS_URL} onClick={this.onClick.bind(this)}>
                <i className='fa fa-files-o'></i>
                <span>{I18n.t('sidebar.subjects')}</span>
              </a>
            </li>

            <li data-page="trainee_types">
              <a href={ADMIN_TRAINEE_TYPES_URL} onClick={this.onClick.bind(this)}>
                <i className='fa fa-dashboard'></i>
                <span>{I18n.t('sidebar.trainee_types')}</span>
              </a>
            </li>

            <li data-page="training_standards">
              <a href={TRAINING_STANDARDS_URL} onClick={this.onClick.bind(this)}>
                <i className='fa fa-wpforms'></i>
                <span>{I18n.t('sidebar.training_standards')}</span>
              </a>
            </li>

            <li data-page="universities">
              <a href={ADMIN_UNIVERSITIES_URL} onClick={this.onClick.bind(this)}>
                <i className='fa fa-university'></i>
                <span>{I18n.t('sidebar.universities')}</span>
              </a>
            </li>

            <li>
              <a href="#" onClick={this.onClickSubMenu.bind(this)}>
                <i className="glyphicon glyphicon-th-list" aria-hidden="true"></i>
                <span>{I18n.t('sidebar.mange_role')}</span>
                <span className="fa fa-chevron-down"></span>
              </a>
              <ul className={this.state.roles_menu}>
                <li data-page="roles">
                  <a href={ROLES_URL} onClick={this.onClick.bind(this)}>
                    <span>{I18n.t('sidebar.roles')}</span>
                  </a>
                </li>
                <li data-page="functions">
                  <a href={FUNCTIONS_URL} onClick={this.onClick.bind(this)}>
                    <span>{I18n.t('sidebar.all_functions')}</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </aside>
    );
  }

  onClick(event) {
    localStorage.setItem('page', $(event.target).closest('li').data('page'));
  }

  onClickSubMenu(event){
    event.preventDefault();
    if(this.state.roles_menu == 'showed'){
      this.setState({roles_menu: 'hiddened'});
      localStorage.setItem('roles_menu', 'hiddened');
    } else if(this.state.roles_menu == 'hiddened'){
      this.setState({roles_menu: 'showed'});
      localStorage.setItem('roles_menu', 'showed');
    }
  }

  componentDidMount(){
    let page = localStorage.getItem('page');
    $('.td-admin-sidebar li.active').removeClass('active');
    if($('li[data-page="' + page + '"]')){
      $('li[data-page="' + page + '"]').addClass('active');
    }
    localStorage.setItem('role_checkbox', '{}');
  }
}
