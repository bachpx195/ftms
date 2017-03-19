import React from 'react';
import axios from 'axios';

export default class CheckBox extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      checked: props.checked,
      id: props.id
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      checked: nextProps.checked,
      id: nextProps.id
    });
  }

  render(){
    return(
      <div className="t-checkbox">
        <input type="checkbox" checked={this.state.checked}
          onChange={this.onClickCheckBox.bind(this)} />
      </div>
    )
  }

  onClickCheckBox(event){
    let target = event.target;
    this.props.afterClickCheckbox(this.state.id, target.checked);
  }
}
