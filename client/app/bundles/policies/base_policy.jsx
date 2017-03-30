import React from 'react';
import HelperPolicy from './support/helper_policy'
import * as DefineVariable from './support/define_variable';

export default class BasePolicy extends React.Component {
  constructor(props) {
    super(props);
    this.helperPolicy = new HelperPolicy(this.ALLOW_FUNCTIONS);
  }

  registerRefresh(ob) {
    this.OBJECT_REFRESH.push(ob);
  }

  refresh() {
    this.setState({refresh: true});
  }

  checkAllowFunction(data) {
    var result = false;
    var target = null;
    for(var record of data) {
      var check = this.checkSingleAllowFunction(record);
      if(check) {
        result = true;
        target = record.target;
        break;
      }
    }
    return {is_allow: result, target: target};
  }

  checkSingleAllowFunction(record) {
    var result = true;
    for(var action of record.action) {
      if(this.isDefaultAction(action) &&
        !this.helperPolicy.isAllowFunction(this.controller, action)) {
        result = false;
        break;
      }
      else if(!this.isDefaultAction(action) &&
        !this.helperPolicy.isAllowCustomFunction(action, record)) {
          result = false;
          break;
      }
    }
    return result;
  }

  isDefaultAction(action) {
    if(action.search(/^!.+/i) >= 0)
      action = action.substring(1, action.length);
    return $.inArray(action, DefineVariable.DEFAULT_ACTION) >= 0
  }

  render() {
    this.helperPolicy = new HelperPolicy(this.ALLOW_FUNCTIONS);
    var result = this.checkAllowFunction(this.props.permit);
    if(result.is_allow) {
      return this.props[result.target];
    } else
      return null
  }
}
