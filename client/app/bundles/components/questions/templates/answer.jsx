import axios from 'axios';
import React from 'react';

export default class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: props.answer
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      answer: nextProps.answer
    })
  }

  render() {
    let check = this.state.answer.is_correct ? 'check-enable' : 'check-disable';
    return (
      <div className='list-answers'>
        <div className='tool-bar col-xs-4'>
          <ul className='list-action'>
            <li className='correct-answer'>
              <div className={`check ${check} pointer`}>
                <i className='fa fa-check'></i>
              </div>
            </li>
          </ul>
        </div>
        <div className='side-right col-xs-8'>
          <div className='form-group'>
            <div className='form-input-answer'>
              {this.state.answer.content}
            </div>
          </div>
        </div>
        <div className='clearfix'></div>
      </div>
    )
  }
}
