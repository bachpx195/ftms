import BasePolicy from '../base_policy';

export default class UniversityPolicy extends BasePolicy {
  constructor(props) {
    super(props);
    this.registerRefresh(this);
    this.controller = 'universities';
  }
}
