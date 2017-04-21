import React from 'react';

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
      <div className='row'>
        <div className='col-md-8 col-md-offset-2 certificate-form clearfix'>
          <div className='col-md-12 text-center'>
            <div className='certificate-header'>
              <img src='/assets/framgia-logo.png'/>
            </div>
            <div className='certificate-body'>
              <div className='certificate-title'>
                <span>{I18n.t('certificates.title')}</span>
              </div>
              <div className='main-content text-center'>
                <span className='individual-name'>Lương Văn Tối</span>
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
                <h3 className='certificate-program'>RUBY ON RAILS TRAINING COURSE</h3>
                <div className='result-size'>
                  <h3>A COURSE OF STUDY OFFERED BY EDUCATION DIVISION, FRAMGIAVN</h3>
                  <span>{I18n.t('certificates.main_content.with')} </span>
                  <span className={`certificate-result ${this.state.result}`}>
                    {I18n.t('certificates.main_content.excellent')}
                  </span>
                  <span>{I18n.t('certificates.main_content.result')}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='certicate-footer text-center'>
            <h2>06/09/2017</h2>
          </div>
        </div>
        <div className='col-md-8 col-md-offset-2 clearfix text-center'>
          <div className='btn btn-primary button-download-pdf'>
            <i className='fa fa-download'></i>&nbsp;
            <span>{I18n.t('certificates.button.pdf_download')}</span>
          </div>
        </div>
      </div>
    );
  }
}
