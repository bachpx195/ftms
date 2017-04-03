import BasePolicy from '../base_policy';

export default class OrganizationPolicy extends BasePolicy {
  constructor(props) {
    super(props);
    this.registerRefresh(this);
    this.controller = 'organizations';
  }
}
