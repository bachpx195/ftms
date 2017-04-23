import axios from 'axios';
import React from 'react';
import ReactOnRails from 'react-on-rails';

export default class TimelineTabPane extends React.Component {
  render(){
    return(
      <div className='tab-pane timeline-container active clearfix' id='timeline'>
        <ul className='timeline timeline-inverse'>
          <li className='time-label'>
                <span className='bg-red'></span>
          </li>
          <li>
            <i className='fa fa-envelope bg-blue'></i>

            <div className='timeline-item'>
              <span className='time'><i className='fa fa-clock-o'></i> 12:05</span>

              <h3 className='timeline-header'><a href='#'></a></h3>

              <div className='timeline-body'>
              </div>
              <div className='timeline-footer'>
                <a className='btn btn-primary btn-xs'></a>
                <a className='btn btn-danger btn-xs'></a>
              </div>
            </div>
          </li>
          <li>
            <i className='fa fa-clock-o bg-gray'></i>
          </li>
        </ul>
      </div>
    );
  }
}
