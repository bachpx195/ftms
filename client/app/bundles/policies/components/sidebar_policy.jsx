import BasePolicy from '../base_policy';

export default class Permit extends BasePolicy {
  constructor(props) {
    super(props);
    this.registerRefresh(this);
  }

  render() {
    var policies = [];
    for(var policy of this.ALLOW_FUNCTIONS) {
      policies.push(policy['controller'])
    }

    if($.inArray(this.props.action, policies) >= 0)
      return this.props.children;
    else return null;
  }
}
