import React from 'react';

export default class Checkbox extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      is_checked: props.is_checked
    }
  }

  render() {
    return(
      <input type='checkbox' onChange={this.handleChange.bind(this)}
        checked={this.state.is_checked || false} />
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      is_checked: nextProps.is_checked
    })
  }

  handleChange() {
    this.props.handleClick(this.props.index, !this.state.is_checked);
  }
}
