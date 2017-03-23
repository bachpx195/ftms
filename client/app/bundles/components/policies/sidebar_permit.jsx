import React from 'react';

export default class Permit extends React.Component {
  constructor(props) {
    super(props);
    var policies = JSON.parse(localStorage.getItem('policies'));
    this.state = {
      policies: policies ? policies : []
    }
  }

  componentWillReceiveProps(nextProps){
    var policies = JSON.parse(localStorage.getItem('policies'));
    this.state = {
      policies: policies ? policies : []
    }
  }

  render(){
    var policies = [];
    for(var policy of this.state.policies){
      policies.push(policy['controller_name'] + '/' + policy['action'])
    }

    if($.inArray(this.props.action, policies) >= 0)
      return this.props.children;
    else return null;
  }
}
