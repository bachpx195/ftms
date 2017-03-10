import React from 'react';

export default class CheckRoleBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      is_checked: props.is_checked,
      role: props.role
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      is_checked: nextProps.is_checked,
      role: nextProps.role
    })
  }

  render() {
    return(
      <input type='checkbox' onChange={this.handleCheckboxChange.bind(this)}
        checked={this.state.is_checked} ref='ckbx' key={this.state.role.id} />
    )
  }

  handleCheckboxChange() {
    let ck = this.refs.ckbx;
    this.props.handleCheck(this.state.role, ck.checked);
    this.setState({
      is_checked: ck.checked,
    })
  }
}
