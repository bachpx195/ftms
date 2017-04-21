import axios from 'axios';
import React from 'react';

export default class ModalCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      not_assigned_programs: props.not_assigned_programs,
      organization: props.organization
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      not_assigned_programs: nextProps.not_assigned_programs,
      organization: nextProps.organization
    })
  }

  render() {
    let options = this.state.not_assigned_programs.map(program => {
      return <li key={program.id} className="list-group-item">
        <input type="checkbox" name="program" value={program.id}/> {program.name}
      </li>;
    });
    return (
      <div id="modalAssign" className="modal fade in" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close"
                data-dismiss="modal">&times;</button>
              <h4 className="modal-title">{I18n.t('buttons.assign_program')}</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmitAssign.bind(this)}>
                <ul className="list-group checked-list-box">
                  {options}
                </ul>
                <div className="text-right">
                  <button className="btn btn-primary">
                    {I18n.t('buttons.save')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleSubmitAssign(event) {
    event.preventDefault();
    let program_ids = [];
    $('input:checked', $(event.target))
      .each((index, program) => program_ids[index] = parseInt($(program).val()));
    axios.post(this.props.url + ".json", {
      id: this.state.organization.id,
      'program_ids': program_ids,
      authenticity_token: ReactOnRails.authenticityToken()
    })
      .then(response => {
        $('#modalAssign').modal('hide');
        this.props.handleAfterAssignProgram(program_ids);
      })
      .catch(error => console.log(error));
  }
}
