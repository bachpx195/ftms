import BasePolicy from '../base_policy';

export default class QuestionPolicy extends BasePolicy {
  constructor(props) {
    super(props);
    this.registerRefresh(this);
    this.controller = 'questions';
  }
}
