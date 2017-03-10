import React from 'react';

export default class CheckboxRole extends React.Component{
  constructor(props) {
    super(props);
    var role_checkbox = JSON.parse(localStorage.getItem('role_checkbox'));
    var key_role_checkbox = props.griddleKey.griddleKey;
    if(role_checkbox[key_role_checkbox])
      var is_checked = role_checkbox[key_role_checkbox];
    else
      var is_checked = props.is_checked;

    this.state={
      griddleKey: props.griddleKey.griddleKey,
      is_checked: is_checked
    }
  }

  render() {
    return(
      <input type="checkbox" onChange={this.handleCheckboxChange.bind(this)}
        data-index={this.state.griddleKey} checked={this.state.is_checked} ref="chkb" />
    );
  }

  handleCheckboxChange(){
    let ck = this.refs.chkb;
    this.setState({is_checked: ck.checked});
    let role_checkbox = JSON.parse(localStorage.getItem('role_checkbox'));
    role_checkbox[$(ck).attr('data-index')] = ck.checked;
    localStorage.setItem('role_checkbox', JSON.stringify(role_checkbox));
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      is_checked: nextProps.is_checked
    })
  }
}
