import BasePolicy from '../base_policy';

export default class LanguagePolicy extends BasePolicy {
  constructor(props) {
    super(props);
    this.registerRefresh(this);
  }
}
