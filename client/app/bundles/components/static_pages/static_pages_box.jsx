import React from 'react';
import axios from 'axios';
import HeaderStatic from './header_static';
import HomePage from './home_page';
import FooterStatic from './footer_static';

import * as app_constants from 'constants/app_constants';
import * as static_page_constants from './static_page_constants';

const ROOT_URL = app_constants.APP_NAME + app_constants.ROOT_PATH;
const STATIC_PAGE_URL = app_constants.APP_NAME + static_page_constants.STATIC_PAGE_PATH;

export default class StaticPageBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      languages: [],
      trainees_size: 0,
      trainers_size: 0,
      courses_size: 0,
    };
  }

  componentWillMount() {
    this.fetchStaticPages();
  }

  render () {
    return (
      <div>
        <HeaderStatic />
        <HomePage {...this.state} />
        <FooterStatic />
      </div>
    );
  }

  fetchStaticPages() {
    axios.get(STATIC_PAGE_URL + '/show.json')
      .then(response => this.setState({
        languages: response.data.languages,
        trainees_size: response.data.trainees_size,
        trainers_size: response.data.trainers_size,
        courses_size: response.data.courses_size,
      }))
      .catch(error => console.log(error));
  }
}
