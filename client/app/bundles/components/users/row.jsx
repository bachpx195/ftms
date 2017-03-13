import React from 'react';

export default  class Row extends React.Component {
  constructor(props) {
    super(props);
  }

  _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  render(){
    var _react2 = this._interopRequireDefault(React);
    var Cell = this.props.Cell;
    var columnIds = this.props.columnIds;
    var style = this.props.style;
    var griddleKey = this.props.griddleKey;
    var className = this.props.className;
    return _react2.default.createElement(
      'tr',
      {
        onClick: () => {this.handleClick(griddleKey)},
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
  }
}
