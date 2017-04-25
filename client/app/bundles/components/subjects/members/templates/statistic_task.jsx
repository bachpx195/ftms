import css from '../../assets/subject.scss';
import React from 'react';

export default class StatisticTask extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      statistic: props.statistic,
      subject: props.subject
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      statistic: nextProps.statistic,
      subject: nextProps.subject
    });
  }

  render() {
    return(
      <div className='block-statistic'>
        <div className='subject-cover'>
          <img src={this.state.subject.image.url} />
        </div>
        <div className='content-block'>
          <div className='init-task'>
            <div className='icon-status'>
              <i className="fa fa-circle"></i>
            </div>
            <div className='text'>
              <div>
                <span className='title'>
                  {I18n.t('tasks.statistics.init')}
                </span>
                <span>
                  {this.state.statistic.init} / {this.props.length}
                </span>
              </div>
            </div>
          </div>
          <div className='inprogress'>
            <div className='icon-status'>
              <i className="fa fa-circle"></i>
            </div>
            <div className='text'>
              <div>
                <span className='title'>
                  {I18n.t('tasks.statistics.inprogress')}
                </span>
                <span>
                  {this.state.statistic.inprogress} / {this.props.length}
                </span>
              </div>
            </div>
          </div>
          <div className='finished'>
            <div className='icon-status'>
              <i className="fa fa-circle"></i>
            </div>
            <div className='text'>
              <div>
                <span className='title'>
                  {I18n.t('tasks.statistics.finished')}
                </span>
                <span>
                  {this.state.statistic.finished} / {this.props.length}
                </span>
              </div>
            </div>
          </div>
          <div className='reject'>
            <div className='icon-status'>
              <i className="fa fa-circle"></i>
            </div>
            <div className='text'>
              <div>
                <span className='title'>
                  {I18n.t('tasks.statistics.reject')}
                  
                </span>
                <span>
                  {this.state.statistic.reject} / {this.props.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
