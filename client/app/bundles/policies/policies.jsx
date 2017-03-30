import BasePolicy from './base_policy';

export default class Policies extends BasePolicy {
  constructor(props) {
    super(props);
    BasePolicy.prototype.ALLOW_FUNCTIONS = window.allow_functions || [];
    BasePolicy.prototype.OBJECT_REFRESH = [];
  }

  componentWillMount() {
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

  receive_policies(policies) {
    var functions = [];
    for(var node of policies) {
      functions.push({controller: node.controller_name, action: node.action})
    }
    BasePolicy.prototype.ALLOW_FUNCTIONS = functions;
    window.alreadyPolicies = true;
    window.allow_functions = this.ALLOW_FUNCTIONS;
    this.refreshObject();
    App.cable.disconnect(App.policies);
  }

  refreshObject() {
    for(var node of this.OBJECT_REFRESH) {
      var refresh = this.refresh.bind(node);
      refresh();
    }
  }

  render() {
    return null;
  }
}
