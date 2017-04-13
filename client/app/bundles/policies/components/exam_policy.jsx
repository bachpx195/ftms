import BasePolicy from '../base_policy';

export default class ExamPolicy extends BasePolicy {
  constructor(props) {
    super(props);
    this.registerRefresh(this);
    this.controller = 'exams';
  }
}
