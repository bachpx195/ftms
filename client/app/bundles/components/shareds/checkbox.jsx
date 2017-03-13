import React from 'react';

export default class Checkbox extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      is_checked: props.is_checked
    }
  }

  render() {
    return(
      <input type="checkbox" onChange={() => {this.props.handleClick(this.props.griddleKey, !this.state.is_checked)}}
        checked={this.state.is_checked || false} />
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      is_checked: nextProps.is_checked
    })
  }
}
