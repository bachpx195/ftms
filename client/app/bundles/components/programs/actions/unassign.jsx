import axios from 'axios';
import React from 'react';

export default class Create extends React.Component {
  render() {
    return (
      <button className="btn btn-warning"
        onClick={this.handleUnassignProgram.bind(this)}>
        {I18n.t('buttons.unassign')}
      </button>
    );
  }

  handleUnassignProgram(event) {
    let $target = $(event.target);
    $target.blur();
    let {program} = this.props;
    if (confirm(I18n.t('data.confirm_unassign'))) {
      axios.delete(this.props.url, {
        params: {
          program_id: program.id,
          authenticity_token: ReactOnRails.authenticityToken()
        }
      })
        .then(response => {
          this.props.handleAfterUnassignProgram(program.id);
        })
        .catch(error => console.log(error));
    }
  }
}
