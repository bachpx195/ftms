import React from 'react';

export default class SelectCell extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span onClick={this.props.handleSelectCell}>
        <i className='fa fa-check-square-o'></i>/
        <i className='fa fa-square-o'></i>
      </span>
    );
  }
}
