import React from 'react';
import Form from './form';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state={...props}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
  }

  render() {
    return (
      <div id="modalNode" className="modal fade in" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">{I18n.t("sub_organizations.create")}</h4>
            </div>
            <div className="modal-body">
              <Form
                status={this.state.status}
                organization={this.props.organization}
                name={this.state.name}
                id={this.state.id}
                parent={this.state.parent}
                afterEdit={this.afterEdit.bind(this)}
                afterCreate={this.afterCreate.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  afterEdit(program) {
    this.props.afterEdit(program);
  }

  afterCreate(program) {
    this.props.afterCreate(program);
  }
}
