import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <li className="list-group-item">
        <div className="row">
          <div className="col-md-3">
            <label>
              {I18n.t('evaluation_standards.headers.name')}
            </label>
          </div>
          <div className="col-md-2">
            <label>
              {I18n.t('evaluation_standards.headers.min_point')}
            </label>
          </div>
          <div className="col-md-2">
            <label>
              {I18n.t('evaluation_standards.headers.max_point')}
            </label>
          </div>
          <div className="col-md-3">
          </div>
        </div>
      </li>
    );
  }
}
