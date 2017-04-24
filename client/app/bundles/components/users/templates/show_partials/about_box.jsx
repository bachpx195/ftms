import axios from 'axios';
import React from 'react';
import ReactOnRails from 'react-on-rails';

export default class AboutBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return(
      <div className='box box-default box-solid'>
        <div className='box-header with-border'>
          <h3 className='box-title'>{I18n.t('users.about_tab.title')}</h3>
          <div className='box-tools pull-right'>
            <button type='button' className='btn btn-box-tool' data-widget='collapse'>
              <i className='fa fa-minus'></i>
            </button>
          </div>
        </div>
        <div className='box-body'>
          <strong><i className='fa fa-university margin-r-5'></i>
            {I18n.t('users.about_tab.university')}
          </strong>
          <p>{this.props.user_profile.university.name}</p>
          <hr />
          <strong><i className='fa fa-calendar margin-r-5'></i>
            {I18n.t('users.about_tab.graduation')}
          </strong>
          <p>{this.props.user_profile.graduation}</p>
          <hr />
          <strong><i className='fa fa-file-text-o margin-r-5'></i>
            {I18n.t('users.about_tab.note')}
          </strong>
          <p></p>
          <hr />
        </div>
      </div>
    );
  }
}
