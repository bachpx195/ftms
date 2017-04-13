import BasePolicy from '../base_policy';

export default class PublicPolicy extends BasePolicy {
  constructor(props) {
    super(props);
    this.registerRefresh(this);
  }
}
