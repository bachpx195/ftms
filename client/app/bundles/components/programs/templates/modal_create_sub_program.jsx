import Form from '../templates/form';
import React from 'react';

export default class ModalCreateSubProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: props.parent || '',
      program: props.program || '',
      organization: props.organization

    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      parent: nextProps.parent || '',
      program: nextProps.program || '',
      organization: nextProps.organization
    })
  }

  render() {
    let title, parent_id, url = '';
    let {name} = this.state.parent;
    if (this.state.parent) {
      title = name;
      parent_id = this.state.parent.id;
    } else {
      title = I18n.t('programs.create');
    }

    if (this.state.program) {
      url = this.props.url + "/" + this.state.program.id
    } else {
      url = this.props.url
    }

    return (
      <div className="modalEdit modal fade in" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close"
                data-dismiss="modal">&times;</button>
              <h4 className="modal-title">{title}</h4>
            </div>
            <div className="modal-body">
              <Form
                url={url}
                program={this.state.program}
                parent_id={parent_id}
                handleAfterUpdated={this.props.handleAfterUpdated}
                handleAfterCreated={this.props.handleAfterCreated}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
