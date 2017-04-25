import React from 'react';

import * as routes from 'config/routes';

export default class TrainingStandards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      evaluation: props.evaluation,
    };
  }

  render() {
    return (
      <div className='td-evaluation col-sm-12'>
        {I18n.t("evaluation_test")}
      </div>
    );
  }
}
