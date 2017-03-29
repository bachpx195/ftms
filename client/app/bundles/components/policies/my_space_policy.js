import BasePolicy from "./base_policy";

export default class MySapcePolicy extends BasePolicy {
  constructor(data) {
    super();
    this.is_my_space = data.is_my_space;
    this.controller_name = data.controller_name;
    this.action = data.action;
  }

  isMySpace() {
  	this.isValidPolicy(this.controller_name, this.action) &&
  	  this.is_my_space == true;
	}
}
