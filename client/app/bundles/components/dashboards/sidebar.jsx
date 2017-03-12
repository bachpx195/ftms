import React, { PropTypes } from 'react';
import * as app_constants from 'constants/app_constants';
import * as dashboard_constands from './dashboard_constands';

const LANGUAGES_URL = app_constants.APP_NAME + dashboard_constands.LANGUAGES_PATH;
const ORGANIZATIONS_URL = app_constants.APP_NAME +
  dashboard_constands.ORGANIZATIONS_PATH;
const STAGES_URL = app_constants.APP_NAME + dashboard_constands.STAGES_PATH;
const SUBJECTS_URL = app_constants.APP_NAME + dashboard_constands.SUBJECTS_PATH;
const TRAINEE_TYPES_URL = app_constants.APP_NAME +
  dashboard_constands.TRAINEE_TYPES_PATH;
const TRAINING_STANDARDS_URL = app_constants.APP_NAME +
  dashboard_constands.TRAINING_STANDARDS_PATH;
const UNIVERSITIES_URL = app_constants.APP_NAME +
  dashboard_constands.UNIVERSITIES_PATH;
const FUNCTIONS_URL = app_constants.APP_NAME +
  dashboard_constands.FUNCTIONS_PATH;
const ROLES_URL = app_constants.APP_NAME +
  dashboard_constands.ROLES_PATH;
const USERS_URL = app_constants.APP_NAME +
  dashboard_constands.USERS_PATH;


export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    if(!localStorage.getItem('page')) {
      localStorage.setItem('page', 'languages');
    }

    this.state = {
      roles_menu: 'hiddened',
      master_menu: 'hiddened'
    };
  }

  componentWillMount() {
    let roles_menu = localStorage.getItem('roles_menu') || 'hiddened';
    let master_menu = localStorage.getItem('master_menu') || 'hiddened';
    this.setState({roles_menu: roles_menu, master_menu: master_menu});
  }

  render () {
    return (
      <aside className='main-sidebar'>
        <section className='sidebar'>
          <ul className='sidebar-menu td-admin-sidebar'>

            <li data-page='organizations'>
              <a href={ORGANIZATIONS_URL} onClick={this.onClick.bind(this)}>
                <i className='fa fa-folder'></i>
                <span>{I18n.t('sidebar.organizations')}</span>
              </a>
            </li>

            <li>
              <a href="#" onClick={this.onClickMasterdata.bind(this)}>
                <i className="fa fa-database" aria-hidden="true"></i>
                <span>{I18n.t('sidebar.master')}</span>
                <span className={`fa fa-chevron-${this.state.master_menu == "showed" ? "down" : "right"}`}></span>
              </a>

              <ul className={this.state.master_menu}>
                <li className='active' data-page='languages'>
                  <a href={LANGUAGES_URL} onClick={this.onClick.bind(this)}>
                    <span>{I18n.t('sidebar.languages')}</span>
                  </a>
                </li>
                <li data-page='stages'>
                  <a href={STAGES_URL} onClick={this.onClick.bind(this)}>
                    <span>{I18n.t('sidebar.stages')}</span>
                  </a>
                </li>

                <li data-page='subjects'>
                  <a href={SUBJECTS_URL} onClick={this.onClick.bind(this)}>
                    <span>{I18n.t('sidebar.subjects')}</span>
                  </a>
                </li>

                <li data-page="trainee_types">
                  <a href={TRAINEE_TYPES_URL} onClick={this.onClick.bind(this)}>
                    <span>{I18n.t('sidebar.trainee_types')}</span>
                  </a>
                </li>

                <li data-page="training_standards">
                  <a href={TRAINING_STANDARDS_URL} onClick={this.onClick.bind(this)}>
                    <span>{I18n.t('sidebar.training_standards')}</span>
                  </a>
                </li>

                <li data-page="universities">
                  <a href={UNIVERSITIES_URL} onClick={this.onClick.bind(this)}>
                    <span>{I18n.t('sidebar.universities')}</span>
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="#" onClick={this.onClickSubMenu.bind(this)}>
                <i className="glyphicon glyphicon-th-list" aria-hidden="true"></i>
                <span>{I18n.t('sidebar.mange_role')}</span>
                <span className={`fa fa-chevron-${this.state.roles_menu == "showed" ? "down" : "right"}`}></span>
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

            <li>
              <a href={USERS_URL} onClick={this.onClick.bind(this)}>
                <i className="glyphicon glyphicon-user" aria-hidden="true"></i>
                <span>{I18n.t('sidebar.manage_user')}</span>
              </a>
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
    let target = event.target;
    if(this.state.roles_menu == 'showed'){
      $(target).find('span.fa').removeClass('fa-chevron-down').addClass('fa-chevron-right');
      this.setState({roles_menu: 'hiddened'});
      localStorage.setItem('roles_menu', 'hiddened');
    } else if(this.state.roles_menu == 'hiddened'){
      $(target).find('span.fa').removeClass('fa-chevron-right').addClass('fa-chevron-down');
      this.setState({roles_menu: 'showed'});
      localStorage.setItem('roles_menu', 'showed');
    }
  }

  onClickMasterdata(event) {
    event.preventDefault();
    let target = event.target;
    if(this.state.master_menu == 'showed'){
      $(target).find('span.fa').removeClass('fa-chevron-down').addClass('fa-chevron-right');
      this.setState({master_menu: 'hiddened'});
      localStorage.setItem('master_menu', 'hiddened');
    } else if(this.state.master_menu == 'hiddened'){
      $(target).find('span.fa').removeClass('fa-chevron-right').addClass('fa-chevron-down');
      this.setState({master_menu: 'showed'});
      localStorage.setItem('master_menu', 'showed');
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
