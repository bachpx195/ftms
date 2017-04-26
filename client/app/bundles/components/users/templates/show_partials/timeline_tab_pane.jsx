import axios from 'axios';
import React from 'react';
import ProgramLists from '../../../profiles/templates/program';
import * as app_constants from 'constants/app_constants';

import * as routes from 'config/routes';

require('../../../profiles/assets/profile.scss');

export default class TimelineTabPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.fetchUserProfile();
  }

  fetchUserProfile() {
    let url = routes.user_profile_url(this.props.user_id);
    axios.get(url + '.json')
    .then(response => {
      this.setState({
        user: response.data.profile,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    if (this.state.user.id) {
      return (
        <div className='tab-pane timeline-container active clearfix' id='timeline'>

          <ul className='timeline timeline-inverse'>
            <li className='time-label'>
              <span className='bg-red'></span>
            </li>
            <li>
              <i className='fa fa-envelope bg-blue'></i>
              <div className='td-profile-box'>
                <ProgramLists
                  programs={this.state.user.profile.programs}
                />
              </div>
              <div className="clearfix"></div>
            </li>
            <li>
              <i className='fa fa-clock-o bg-gray'></i>
            </li>
          </ul>
        </div>
      );
    }
    return null;
  }
}
