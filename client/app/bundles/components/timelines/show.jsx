import React from 'react';

export default class TimeLineBox extends React.Component {

  componentDidMount() {
    load_timeline();
  }

  render() {
    let timeline = null;
    if (this.props.home_page) {
      timeline = (
        <div className='col-md-12'>
          <div id="timeline-embed"></div>
        </div>
      );
    }

    return(
      <div className='user-profile row clearfix'>
        {timeline}
      </div>
    )
  }
}
