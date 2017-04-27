import React from 'react';
import axios from 'axios';

import * as routes from 'config/routes';

export default class ResultBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      training_result: props.training_result,
      total_point: props.total_point,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      training_result: nextProps.training_result,
      total_point: nextProps.total_point,
    });
  }

  render() {
    let rank = this.state.training_result.name || '';

    return (
      <div className="col-md-12 result-box">
        <div className='result-table'>
          <table>
            <tbody>
              <tr>
                <td><label>{I18n.t('courses.evaluation.total_point')}</label></td>
                <td>
                  <input className="text-right" type="text"
                    disabled="true" value={this.state.total_point} />
                </td>
              </tr>
              <tr>
                <td><label>Result</label></td>
                <td>
                  <span className={'training-result ' + rank.toLowerCase()}>{rank}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
