import {CustomFunction} from './custom_functions.jsx';

export default class HelperPolicy {
  constructor(functions) {
    this.allow_functions = functions;
  }

  isAllowFunction(controller, action) {
    var check = false;
    if(action.search(/^!.+/i) >= 0) {
      action = action.substring(1, action.length);
      check = this.getIndexFunction(controller, action) < 0;
    } else
      check = this.getIndexFunction(controller, action) >= 0;
    return check;
  }

  getIndexFunction(controller, action) {
    return this.allow_functions.findIndex(user_function => {
      return (user_function.action == action) && (user_function.controller == controller);
    });
  }

  isAllowCustomFunction(action, record) {
    var result = false;
    if (action.search(/^!.+/i) >= 0) {
      action = action.substring(1, action.length);
      result = !CustomFunction[action](record.data || [])
    } else
      result = CustomFunction[action](record.data || []);
    return result;
  }
}
