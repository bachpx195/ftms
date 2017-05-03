import BasePolicy from '../base_policy';

export default class ProgramPolicy extends BasePolicy {
  constructor(props) {
    super(props);
    this.registerRefresh(this);
    this.controller = 'programs';
  }
}
