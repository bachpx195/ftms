import React from 'react';

import * as routes from 'config/routes';

require('./assets/certificate.scss');

export default class CertificateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'excellent',
    }
  }


  render() {
    return (
      <div>
        <div className='col-md-12 certificate-form clearfix'>
          <div className="background-img-top-left background-img">
            <img src={`/assets/top-left-corner.png`} />
          </div>
          <div className="background-img-top-right background-img">
            <img src={`/assets/top-right-corner.png`} />
          </div>
          <div className="background-img-bottom-left background-img">
            <img src={`/assets/bottom-left-corner.png`} />
          </div>
          <div className="background-img-bottom-right background-img">
            <img src={`/assets/bottom-right-corner.png`} />
          </div>
          <div className='col-md-12 text-center'>
            <div className='certificate-header'>
              <img src='/assets/framgia-logo.png'/>
            </div>
            <div className='certificate-body'>
              <div className='certificate-title'>
                <span>{I18n.t('certificates.title')}</span>
              </div>
              <div className='main-content text-center'>
                <span className='individual-name'>{this.props.user.name}</span>
                <hr />
                <div className='static-text ribbon'>
                  <span className='sub-ribbon'>
                    {I18n.t('certificates.main_content.static_text')}
                  </span>
                  <div className='ribbon-after'>
                  </div>
                  <div className='ribbon-before'>
                  </div>
                </div>
                <h3 className='certificate-program'>
                  RUBY ON RAILS TRAINING COURSE
                </h3>
                <div className='result-size'>
                  <h3>{I18n.t('users.certificates.content')}</h3>
                  <span>
                    {I18n.t('certificates.main_content.with')}
                  </span>
                  <span className={`certificate-result ${this.state.result}`}>
                    {I18n.t('certificates.main_content.excellent')}
                  </span>
                  <span>{I18n.t('certificates.main_content.result')}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='certicate-footer text-center'>
            <h2>{new Date().toJSON().slice(0,10).replace(/-/g,'/')}</h2>
          </div>
        </div>
        <div className='col-md-8 col-md-offset-2 clearfix text-center'>
          <a className='btn btn-primary button-download-pdf'
            href={routes.certificate_url(this.props.user.id) + '.pdf'}>
            <i className='fa fa-download'></i>&nbsp;
            <span>{I18n.t('certificates.button.pdf_download')}</span>
          </a>
        </div>
      </div>
    );
  }
}
