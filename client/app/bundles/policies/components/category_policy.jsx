import BasePolicy from '../base_policy';

export default class CategoryPolicy extends BasePolicy {
  constructor(props) {
    super(props);
    if (props.refresh != false) this.registerRefresh(this);
    this.controller = 'categories';
  }
}
