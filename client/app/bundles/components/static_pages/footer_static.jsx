import React, { PropTypes } from 'react';
import * as app_constants from 'constants/app_constants';

const ROOT_URL = app_constants.APP_NAME + app_constants.ROOT_PATH;

export default class FooterStatic extends React.Component {
  render () {
    return (
      <footer className='footer-distributed'>
        <div className='footer-left'>
          <h3><span>{I18n.t('layouts.footer.company')}</span></h3>
          <p className='footer-links'>
            <a href={ROOT_URL}>
              {I18n.t('layouts.footer.home')}
            </a>
            <a href='#'>
              {I18n.t('layouts.footer.blog')}
            </a>
            <a href='#'>
              {I18n.t('layouts.footer.about')}
            </a>
            <a href='#'>
              {I18n.t('layouts.footer.faq')}
            </a>
            <a href='#'>
              {I18n.t('layouts.footer.contact')}
            </a>
          </p>
          <p className='footer-company-name'>{I18n.t('layouts.footer.copy_right')}</p>
        </div>
        <div className='footer-center'>
          <div className='footer-icon'>
            <span>
              <i className='fa fa-map-marker'></i>
            </span>
            <p>
              <span>
                {I18n.t('layouts.footer.street')}
              </span>
            </p>
          </div>
          <div>
            <i className='fa fa-phone'></i>
            <p>{I18n.t('layouts.footer.phone')}</p>
          </div>
          <div>
            <i className='fa fa-envelope'></i>
            <p>
              <a href='mailto:hr_team@framgia.com'>
                {I18n.t('layouts.footer.mail_to')}
              </a>
            </p>
          </div>
        </div>
        <div className='footer-right'>
          <p className='footer-company-about'>
            <span>{I18n.t('layouts.footer.about_us')}</span>
            {I18n.t('layouts.footer.content_about_us')}
          </p>
          <div className='footer-icons'>
            <a href='https://www.facebook.com/FramgiaVietnam' target='_blank'>
              <i className='fa fa-facebook'></i>
            </a>
            <a href='#'><i className='fa fa-twitter'></i></a>
            <a href='https://www.linkedin.com/company/3341218?trk=tyah&trkInfo=clickedVertical%3Acompany%2CclickedEntityId%3A3341218%2Cidx%3A2-1-2%2CtarId%3A1465497556522%2Ctas%3Aframgia%20vietnam' target='_blank'>
              <i className='fa fa-linkedin'></i>
            </a>
            <a href='https://github.com/framgia/' target='_blank'><i className='fa fa-github'></i></a>
          </div>
        </div>
      </footer>
    );
  }
}
