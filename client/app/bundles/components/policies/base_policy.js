export default class BasePolicy {
  constructor() {
    this.policies = JSON.parse(localStorage.policies);
  }

  isValidPolicy(controller_name, action) {
    return this.policies.findIndex(policy => {
      return policy.controller_name == controller_name &&
      policy.action == action;
    }) >= 0;
  }
};
