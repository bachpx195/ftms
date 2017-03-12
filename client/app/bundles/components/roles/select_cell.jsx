import React from 'react';

export default class SelectCell extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
  }

  componentWillReceiveProps(nextProps) {
    var checked = nextProps.checked == 'yes';
    this.setState({
      checked: checked
    })
  }

  render() {
    return (
      <span onClick={this.props.handleSelectCell}>
        <input type="checkbox" checked={this.state.checked}
          onChange={this.props.handleSelectCell}/>
      </span>
    );
  }
}
