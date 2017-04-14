import Form from '../templates/form';
import React from 'react';

export default class ModalCreateSubProgram extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: props.parent || '',
      program: props.program || ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      parent: nextProps.parent || '',
      program: nextProps.program || ''
    })
  }

  render() {
    let title = '';
    let {name} = this.state.parent;
    let parent_id = '';
    if (this.state.parent) {
      title = name;
      parent_id = this.state.parent.id;
    } else {
      title = I18n.t('programs.create');
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
                url={this.props.url}
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
