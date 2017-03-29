export default class LanguagePolicy {
  constructor(props) {
    this.functions = props.functions;
  }

  update(record) {
    return this.functions.findIndex(user_function => {
      return user_function.action == 'update';
    }) >= 0;
  }

  destroy(record) {
    return this.functions.findIndex(user_function => {
      return user_function.action == 'destroy';
    }) >= 0;
  }
}
