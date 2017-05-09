import BasePolicy from '../base_policy';

export default class UserPolicy extends BasePolicy {
  constructor(props) {
    super(props);
    this.registerRefresh(this);
    this.controller = 'users';
  }
}
