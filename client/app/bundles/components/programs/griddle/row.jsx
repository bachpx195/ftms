import React from 'react';
import ProgramPolicy from 'policy/program_policy';

export default  class Row extends React.Component {
  _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : {default: obj}; }

  componentWillReceiveProps(nextProps) {
    this.setState({
      refresh: true
    });
  }

  render() {
    var _react2 = this._interopRequireDefault(React);
    var Cell = this.props.Cell;
    var columnIds = this.props.columnIds;
    var style = this.props.style;
    var griddleKey = this.props.griddleKey;
    var className = this.props.className;
    var defaultRow = _react2.default.createElement(
      'tr',
      {
        key: griddleKey,
        style: style,
        className: className
      },
      columnIds && columnIds.map(function (c) {
        return _react2.default.createElement(Cell, {
          key: c + '-' + griddleKey,
          griddleKey: griddleKey,
          columnId: c,
          style: style,
          className: className
        });
      })
    );
    var record = this.programs[this.props.griddleKey];
    var organization = this.organization;
    return(
      <ProgramPolicy
        permit={[
          {action: ['index']},
          {action: ['create', 'creator'], data: record},
          {action: ['ownerById'], data: {id: organization.user_id}},
          {action: ['show', 'ownerByIds'], data: {ids: [record.creator_id, organization.creator_id]}},
          {action: ['show', 'belongById'], data: {key: 'program_id', id: record.id}},
      ]}>
        {defaultRow}
      </ProgramPolicy>
    )
  }
}
