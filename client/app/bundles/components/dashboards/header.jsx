import React, { PropTypes } from 'react';
import * as app_constants from 'constants/app_constants';

const LOGOUT_URL = app_constants.APP_NAME + app_constants.LOGOUT_PATH;
const ROOT_URL = app_constants.APP_NAME;

export default class Header extends React.Component {
  render () {
    return (
      <header className="main-header">
        <a href={`${ROOT_URL}`} className="logo">
          <span className="logo-mini"><b>{I18n.t("header.short_logo")}</b></span>
          <span className="logo-lg"><b>{I18n.t("header.long_logo")}</b></span>
        </a>
        <nav className="navbar navbar-static-top">
          <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span className="sr-only">{I18n.t("header.toggle")}</span>
          </a>
          {this.dropdownProfile()}
        </nav>
      </header>
    );
  }

  dropdownProfile() {
    if (localStorage.current_user !== undefined) {
      let current_user = JSON.parse(localStorage.current_user);
      let path = ROOT_URL + app_constants.USERS_PATH + '/' + current_user.id;
      return (
        <div className="navbar-custom-menu">
          <ul className="nav navbar-nav">
            <li className="dropdown user user-menu">
              <a href="" className="dropdown-toggle" data-toggle="dropdown">
                <img src={current_user.avatar ? current_user.avatar.url : ''}
                  className="user-image" alt={I18n.t("header.user_image_alt")} />
                <span className="hidden-xs">{current_user.name}</span>
                <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li className="user-header">
                  <img src={current_user.avatar ? current_user.avatar.url : ''}
                    className="img-circle" alt={I18n.t("header.user_image_alt")} />
                  <p>
                    {current_user.name}
                  </p>
                </li>
                <li className="user-footer">
                  <div className="pull-left">
                    <a href={path} className="btn btn-default btn-flat ev-default">
                      {I18n.t("header.profile")}
                    </a>
                  </div>
                  <div className="pull-right">
                    <a href={LOGOUT_URL} data-method="delete"
                      onClick={this.handleLogout.bind(this)}
                      className="btn btn-default btn-flat ev-default">
                      {I18n.t("header.sign_out")}
                    </a>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="navbar-custom-menu">
          <ul className="nav navbar-nav">
            <li className="dropdown user user-menu">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                <img src="http://www.w3schools.com/css/trolltunga.jpg" className="user-image"
                  alt={I18n.t("header.user_image_alt")} />
                <span className="hidden-xs">{I18n.t("header.no_name")}</span>
                <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li className="user-header">
                  <img src="http://www.w3schools.com/css/trolltunga.jpg"
                    className="img-circle" alt={I18n.t("header.user_image_alt")} />
                  <p>
                    {I18n.t("header.no_name")}
                  </p>
                </li>
                <li className="user-footer">
                  <div className="pull-left">
                    <a href="#" className="btn btn-default btn-flat ev-default">
                      {I18n.t("header.profile")}
                    </a>
                  </div>
                  <div className="pull-right">
                    <a href={LOGOUT_URL} data-method="delete"
                      onClick={this.handleLogout.bind(this)}
                      className="btn btn-default btn-flat ev-default">
                      {I18n.t("header.sign_out")}
                    </a>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      );
    }
  }

  handleLogout() {
    localStorage.removeItem('current_user');
    window.alreadyPolicies = true;
  }
}

document.addEventListener("turbolinks:load", function() {
  $('.ev-default').on('click', function(ev){
    ev.preventDefault();
  });
})
