import React, { PropTypes } from 'react';
import * as app_constants from 'constants/app_constants';
import * as static_page_constants from './static_page_constants';

const ROOT_URL = app_constants.APP_NAME + app_constants.ROOT_PATH;

export default class HeaderStatic extends React.Component {
  render () {
    return (
      <header id="user-header" className="navbar navbar-fixed-top">
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <a href={`${ROOT_URL}`} className='navbar-brand logo'>
                <img src='assets/logo.png' alt="logo" />
              </a>
              <button type="button" className="navbar-toggle" data-toggle="collapse"
                data-target="#header-navbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>

            <div className="collapse navbar-collapse" id="header-navbar">

              <ul className="nav navbar-nav navbar-right td-header-static-nav">
                <li>
                  <a href={`${ROOT_URL}/#programming-languages`}
                    className='scroll_to_section active' data-target='#programming-languages'>
                    {I18n.t('staticpages.programming_languages.title')}
                  </a>
                </li>
                <li>
                  <a href={`${ROOT_URL}/#learning-programs`}
                    className='scroll_to_section' data-target='#learning-programs'>
                    {I18n.t('staticpages.learning_programs.title')}
                  </a>
                </li>
                <li>
                  <a href={`${ROOT_URL}/#counters`}
                    className='scroll_to_section' data-target='#counters'>
                    {I18n.t('staticpages.about')}
                  </a>
                </li>
                <li>
                  <a href='#' className='btn-feed-back' data-target='#feed-back-modal'
                    data-toggle='modal'>
                    {I18n.t('feed_backs.title')}
                  </a>
                </li>
                <li>
                  <button className="btn btn-danger btn-login" data-toggle="modal"
                    data-target="#login-modal">
                    <i className="fa fa-sign-in"></i>
                    {I18n.t('staticpages.login')}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
