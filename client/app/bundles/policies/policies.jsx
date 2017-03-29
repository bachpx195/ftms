import React from 'react';

export default class Policies extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    var current_user = JSON.parse(localStorage.getItem('current_user'));
    if(current_user && !window.alreadyPolicies) {
      App.cable = ActionCable.createConsumer();
      App.policies = App.cable.subscriptions.create(
        {channel: 'PoliciesChannel', id: current_user.id},
        {
          received: (data) => {
            this.receive_policies(data.functions)
          }
        }
      );
    }
  }

  receive_policies(policies){
    localStorage.setItem('policies', JSON.stringify(policies));
    window.alreadyPolicies = true;
    this.rerenderSidebar();
    App.cable.disconnect(App.policies);
  }

  render(){
    return null;
  }
}
