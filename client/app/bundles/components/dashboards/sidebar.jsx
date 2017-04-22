import React, { PropTypes } from 'react';
import Permit from 'policy/sidebar_policy';
import CustomPolicy from 'policy/course_policy';
import * as app_constants from 'constants/app_constants';

const LANGUAGES_URL = app_constants.APP_NAME + app_constants.LANGUAGES_PATH;
const ORGANIZATIONS_URL = app_constants.APP_NAME +
  app_constants.ORGANIZATIONS_PATH;
const STAGES_URL = app_constants.APP_NAME + app_constants.STAGES_PATH;
const SUBJECTS_URL = app_constants.APP_NAME + app_constants.SUBJECTS_PATH;
const COURSES_URL = app_constants.APP_NAME + app_constants.COURSES_PATH;
const TRAINEE_TYPES_URL = app_constants.APP_NAME +
  app_constants.TRAINEE_TYPES_PATH;
const UNIVERSITIES_URL = app_constants.APP_NAME +
  app_constants.UNIVERSITIES_PATH;
const FUNCTIONS_URL = app_constants.APP_NAME +
  app_constants.FUNCTIONS_PATH;
const ROLES_URL = app_constants.APP_NAME +
  app_constants.ROLES_PATH;

const MY_SPACE_COURSES_URL = app_constants.APP_NAME +
  app_constants.MY_SPACE_COURSES_PATH;
const MY_SPACE_EXAMS_URL = app_constants.APP_NAME +
  app_constants.MY_SPACE_EXAMS_PATH;
const CATEGORY_URL = app_constants.APP_NAME + app_constants.CATEGORY_PATH;
const TEST_RULE_URL = app_constants.APP_NAME + app_constants.TEST_RULE_PATH;
const STATISTIC_LANGUAGE_PATH = app_constants.APP_NAME +
  app_constants.STATISTICS_PATH+ '/' + app_constants.LANGUAGES_PATH;
const STATISTIC_TRAINEE_TYPE_PATH = app_constants.APP_NAME +
  app_constants.STATISTICS_PATH + '/' + app_constants.TRAINEE_TYPES_PATH;
const STATISTIC_IN_OUT_PATH = app_constants.APP_NAME
  + app_constants.STATISTICS_PATH + '/' + app_constants.IN_OUT_STATISTIC_PATH;

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    if(!localStorage.getItem('page')) {
      localStorage.setItem('page', 'organizations');
    }
    this.state = {
      roles_menu: 'hiddened',
      master_menu: 'hiddened',
      statistic_menu: 'hiddened',
      organization_ids: props.organization_ids
    };
  }

  componentWillMount() {
    let roles_menu = localStorage.getItem('roles_menu') || 'hiddened';
    let master_menu = localStorage.getItem('master_menu') || 'hiddened';
    let statistic_menu = localStorage.getItem('statistic_menu') || 'hiddened';
    this.setState({
      roles_menu: roles_menu,
      master_menu: master_menu,
      statistic_menu: statistic_menu
    });
  }

  renderUserPanel(){
    if (localStorage.current_user !== undefined) {
      let current_user = JSON.parse(localStorage.current_user);
      let avatar = null;
      if (current_user.avatar) {
        avatar = <img src={current_user.avatar.url}
          className='img-circle'
          alt={I18n.t('header.user_image_alt')} />
      }
      return (
        <div className='user-panel'>
          <div className='pull-left image'>
            {avatar}
          </div>
          <div className='pull-left info' >
            <p>{current_user.name}</p>
          </div>
        </div>
      );
    }
  }

  render () {
    return (
      <aside className='main-sidebar'>
        <section className='sidebar'>
          {this.renderUserPanel()}
          <ul className='sidebar-menu td-admin-sidebar'>
            <li className='header'>{I18n.t('sidebar.space')}</li>
            <Permit action='my_space/courses'>
              <li data-page='my_courses'>
                <a href={MY_SPACE_COURSES_URL} onClick={this.onClick.bind(this)}>
                  <i className='fa fa-clone'></i>
                  <span>{I18n.t('sidebar.my_courses')}</span>
                </a>
              </li>
            </Permit>
            <Permit action='my_space/exams'>
              <li data-page='my_exams'>
                <a href={MY_SPACE_EXAMS_URL} onClick={this.onClick.bind(this)}>
                  <i className='fa fa-file-code-o'></i>
                  <span>{I18n.t('sidebar.my_exams')}</span>
                </a>
              </li>
            </Permit>
            <Permit action='organizations'>
              <li className='header'>{I18n.t('sidebar.main_nav')}</li>
            </Permit>
            <Permit action='organizations'>
              <li data-page='organizations'>
                <a href={ORGANIZATIONS_URL} onClick={this.onClick.bind(this)}>
                  <i className='fa fa-universal-access'></i>
                  <span>{I18n.t('sidebar.organizations')}</span>
                </a>
              </li>
            </Permit>
            <Permit action='programs'>
              <li data-page='courses'>
                <a href={COURSES_URL} onClick={this.onClick.bind(this)}>
                  <i className='fa fa-bookmark'></i>
                  <span>{I18n.t('sidebar.courses')}</span>
                </a>
              </li>
            </Permit>
            <li className='treeview'>
              <Permit action='languages'>
                <a href='#'>
                  <i className='fa fa-database' aria-hidden='true'></i>
                  <span>{I18n.t('sidebar.master')}</span>
                  <span className='pull-right-container'>
                    <i className='fa fa-chevron-down'></i>
                  </span>
                </a>
              </Permit>
              <ul id='subMasterMenu' className='treeview-menu'>
                <Permit action='languages'>
                  <li data-page='languages'>
                    <a href={LANGUAGES_URL} onClick={this.onClick.bind(this)}>
                      <i className='fa fa-circle-o'></i>
                      <span>{I18n.t('sidebar.languages')}</span>
                    </a>
                  </li>
                </Permit>
                <Permit action='stages'>
                  <li data-page='stages'>
                    <a href={STAGES_URL} onClick={this.onClick.bind(this)}>
                      <i className='fa fa-circle-o'></i>
                      <span>{I18n.t('sidebar.stages')}</span>
                    </a>
                  </li>
                </Permit>

                <Permit action='subjects'>
                  <li data-page='subjects'>
                    <a href={SUBJECTS_URL} onClick={this.onClick.bind(this)}>
                      <i className='fa fa-circle-o'></i>
                      <span>{I18n.t('sidebar.subjects')}</span>
                    </a>
                  </li>
                </Permit>

                <Permit action='trainee_types'>
                  <li data-page='trainee_types'>
                    <a href={TRAINEE_TYPES_URL} onClick={this.onClick.bind(this)}>
                      <i className='fa fa-circle-o'></i>
                      <span>{I18n.t('sidebar.trainee_types')}</span>
                    </a>
                  </li>
                </Permit>
                <Permit action='universities'>
                  <li data-page='universities'>
                    <a href={UNIVERSITIES_URL} onClick={this.onClick.bind(this)}>
                      <i className='fa fa-circle-o'></i>
                      <span>{I18n.t('sidebar.universities')}</span>
                    </a>
                  </li>
                </Permit>

                <Permit action='categories'>
                  <li data-page='categories'>
                    <a href={CATEGORY_URL} onClick={this.onClick.bind(this)}>
                      <i className='fa fa-circle-o'></i>
                      <span>{I18n.t('sidebar.categories')}</span>
                    </a>
                  </li>
                </Permit>

                <Permit action='test_rules'>
                  <li data-page='test_rules'>
                    <a href={TEST_RULE_URL} onClick={this.onClick.bind(this)}>
                      <i className='fa fa-circle-o'></i>
                      <span>{I18n.t('sidebar.test_rule')}</span>
                    </a>
                  </li>
                </Permit>
              </ul>
            </li>

            <li className='treeview'>
              <Permit action='roles'>
                <a href='#'>
                  <i className='fa fa-list' aria-hidden='true'></i>
                  <span>{I18n.t('sidebar.mange_role')}</span>
                  <span className='pull-right-container'>
                    <i className='fa fa-chevron-down'></i>
                  </span>
                </a>
              </Permit>
              <ul id='subRoleMenu' className='treeview-menu'>
                <Permit action='roles'>
                  <li data-page='roles'>
                    <a href={ROLES_URL} onClick={this.onClick.bind(this)}>
                      <i className='fa fa-circle-o'></i>
                      <span>{I18n.t('sidebar.roles')}</span>
                    </a>
                  </li>
                </Permit>
                <Permit action='functions'>
                  <li data-page='functions'>
                    <a href={FUNCTIONS_URL} onClick={this.onClick.bind(this)}>
                      <i className='fa fa-circle-o'></i>
                      <span>{I18n.t('sidebar.all_functions')}</span>
                    </a>
                  </li>
                </Permit>
              </ul>
            </li>

            <li className='treeview'>
              <Permit action='statistics'>
                <a href='#'>
                  <i className='fa fa-line-chart' aria-hidden='true'></i>
                  <span>{I18n.t('sidebar.statistics.statistic')}</span>
                  <span className='pull-right-container'>
                    <i className='fa fa-chevron-down'></i>
                  </span>
                </a>
              </Permit>
              <ul id='statistics' className='treeview-menu'>
                <Permit action='languages'>
                  <li data-page='languages'>
                    <a href={STATISTIC_LANGUAGE_PATH} onClick={this.onClick.bind(this)}>
                      <i className='fa fa-circle-o'></i>
                      <span>{I18n.t('sidebar.languages')}</span>
                    </a>
                  </li>
                </Permit>
                <Permit action='trainee_types'>
                  <li data-page='trainee_types'>
                    <a href={STATISTIC_TRAINEE_TYPE_PATH} onClick={this.onClick.bind(this)}>
                      <i className='fa fa-circle-o'></i>
                      <span>{I18n.t('sidebar.trainee_types')}</span>
                    </a>
                  </li>
                </Permit>
                <Permit action='in_outs'>
                  <li data-page='in_outs'>
                    <a href={STATISTIC_IN_OUT_PATH} onClick={this.onClick.bind(this)}>
                      <i className='fa fa-circle-o'></i>
                      <span>{I18n.t('sidebar.statistics.in_outs')}</span>
                    </a>
                  </li>
                </Permit>
              </ul>
            </li>
          </ul>
        </section>
      </aside>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      roles_menu: nextProps.roles_menu,
      master_menu: nextProps.master_menu,
      statistic_menu: nextProps.statistic_menu
    });
  }

  onClick(event) {
    localStorage.setItem('page', $(event.target).closest('li').data('page'));
  }

  onClickSubMenu(event) {
    event.preventDefault();
    let target = event.target;
    if (this.state.roles_menu == 'showed') {
      $('#subRoleMenu').slideUp('slow', function() {
        $(target).find('.fa-chevron-down').removeClass('fa-chevron-down')
          .addClass('fa-chevron-right');
      });
      this.setState({roles_menu: 'hiddened'});
      localStorage.setItem('roles_menu', 'hiddened');
    } else if (this.state.roles_menu == 'hiddened') {
      $('#subRoleMenu').slideDown('slow', function() {
        $(target).find('.fa-chevron-right').removeClass('fa-chevron-right')
          .addClass('fa-chevron-down');
      });
      this.setState({roles_menu: 'showed'});
      localStorage.setItem('roles_menu', 'showed');
    }
  }

  onClickMasterdata(event) {
    event.preventDefault();
    let target = event.target;
    if (this.state.master_menu == 'showed') {
      $('#subMasterMenu').slideUp('slow', function() {
        $(target).find('.fa').removeClass('fa-chevron-down').addClass(
          'fa-chevron-right');
      });
      this.setState({master_menu: 'hiddened'});
      localStorage.setItem('master_menu', 'hiddened');
    } else if (this.state.master_menu == 'hiddened') {
      $('#subMasterMenu').slideDown('slow', function() {
        $(target).find('.fa').removeClass('fa-chevron-right').addClass(
          'fa-chevron-down');
      });
      this.setState({master_menu: 'showed'});
      localStorage.setItem('master_menu', 'showed');
    }
  }

  onClickStatistic(event) {
    event.preventDefault();
    let target = event.target;
    if(this.state.statistic_menu == 'showed'){
      $('#statistics').slideUp('slow', function(){
        $(target).find('.fa').removeClass('fa-chevron-down').addClass(
          'fa-chevron-right');
      });
      this.setState({statistic_menu: 'hiddened'});
      localStorage.setItem('statistic_menu', 'hiddened');
    } else if(this.state.statistic_menu == 'hiddened'){
      $('#statistics').slideDown('slow', function(){
        $(target).find('.fa').removeClass('fa-chevron-right').addClass(
          'fa-chevron-down');
      });
      this.setState({statistic_menu: 'showed'});
      localStorage.setItem('statistic_menu', 'showed');
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
