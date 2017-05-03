import BasePolicy from '../base_policy';

export default class TrainingStandardPolicy extends BasePolicy {
  constructor(props) {
    super(props);
    this.registerRefresh(this);
    this.controller = 'training_standards';
  }
}
