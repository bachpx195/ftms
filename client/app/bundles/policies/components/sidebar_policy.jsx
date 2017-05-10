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
    var checkCustom = true;
    var checkController =  $.inArray(this.props.action, policies) >= 0;
    if (this.props.custom) checkCustom = this.helperPolicy.isAllowCustomFunction(
      this.props.custom, {data: this.props.data});
    if (checkController && checkCustom) return this.props['children']
    else return null;
  }
}
