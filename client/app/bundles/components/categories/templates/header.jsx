import axios from 'axios';
import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className='col-md-12'>
        <div className='row'>
          <div className='griddle-head clearfix'>
            <div className='col-md-6'>
              <this.props.Filter />
            </div>
            <div className='col-md-6 text-right'>
              <this.props.Pagination />
            </div>
          </div>
          <div className='col-md-12'>
            <this.props.Table />
          </div>
        </div>
      </div>
    );
  }
}
