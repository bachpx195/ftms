import BasePolicy from '../base_policy';

export default class SubjectPolicy extends BasePolicy {
  constructor(props) {
    super(props);
    this.registerRefresh(this);
    this.controller = 'subjects';
  }
}
