import BasePolicy from '../base_policy';

export default class ShareWithPolicy extends BasePolicy {
  constructor(props) {
    super(props);
    this.registerRefresh(this);
    this.controller = 'share_withs';
  }
}
