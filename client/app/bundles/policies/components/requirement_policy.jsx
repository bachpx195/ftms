import BasePolicy from '../base_policy';

export default class RequirementPolicy extends BasePolicy {
  constructor(props) {
    super(props);
    this.registerRefresh(this);
    this.controller = 'requirements';
  }
}
