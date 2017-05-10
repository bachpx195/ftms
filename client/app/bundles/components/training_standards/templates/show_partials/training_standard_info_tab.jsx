import Header from '../header';
import React from 'react';
import * as react_table_ultis from 'shared/react-table/ultis';

export default class TrainingStandardInfoTab extends React.Component {
  render() {
    return (
      <div className='tab-pane active clearfix' id='training_standard_info'>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>{I18n.t('training_standards.headers.name')}</strong>
              </td>
            </tr>
            <tr>
              <td>
                <div className='box'>
                  {this.props.training_standard.name}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <strong>{I18n.t('training_standards.headers.description')}</strong>
              </td>
            </tr>
            <tr>
              <td>
                <p className='box'>
                  {this.props.training_standard.description || ''}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <strong>{I18n.t('training_standards.headers.policy')}</strong>
              </td>
            </tr>
            <tr>
              <td>
                <span className='form-control'>
                  {this.props.training_standard.policy}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
