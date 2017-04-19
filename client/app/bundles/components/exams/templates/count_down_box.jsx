import React from 'react';

export default class CountDownBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: props.time
    }
    this.timer = null;
    this.countDown = this.countDown.bind(this)
  }

  componentDidMount() {
    if (this.state.time > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.timer) {
      this.setState({
        time: nextProps.time
      });
    }
  }

  render() {
    let hours = Math.floor(this.state.time / 3600);
    let minutes = Math.floor((this.state.time - hours * 3600) / 60);
    let seconds = this.state.time % 60;

    return (
      <div className='count-down-box'>
        <p>{I18n.t('exams.time_remaining')}</p>
        <div className='row'>
          <div className='col-sm-4 text-center'>
            <p className='number'>{hours}</p>
            <p>{I18n.t('exams.hours')}</p>
          </div>
          <div className='col-sm-4 text-center'>
            <p className='number'>{minutes}</p>
            <p>{I18n.t('exams.minutes')}</p>
          </div>
          <div className='col-sm-4 text-center'>
            <p className='number'>{seconds}</p>
            <p>{I18n.t('exams.seconds')}</p>
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.timer && this.state.time > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    if (this.state.time > 0) {
      this.setState({time: --this.state.time});
    } else {
      clearInterval(this.timer);
      this.timer = null;
      alert(I18n.t('exams.times_up'));
      this.props.submitExam();
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
