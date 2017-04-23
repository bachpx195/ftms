import Create from '../actions/create';
import React from 'react';
import ReactOnRails from 'react-on-rails';
import Update from '../actions/update';

export default class FormOrganization extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: props.organization ? props.organization.name : '',
      organization: props.organization || ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.organization ? nextProps.organization.name : '',
      organization: nextProps.organization
    });
  }

  render(){
    let action = '';
    let attributes = _.omit(this.state, 'organization');
    if (this.state.organization) {
      action =
        <Update
          url={this.props.url}
          params={'organization'}
          attributes={attributes}
          handleAfterUpdated={this.props.handleAfterUpdated}/>
    } else {
      action =
        <Create
          url={this.props.url}
          params={'organization'}
          attributes={attributes}
          handleAfterCreated={this.handleAfterCreated.bind(this)}
        />
    }
    return (
      <form>
        <div className="form-group">
          <input type="text" placeholder={I18n.t("organizations.create")}
            className="form-control" name="name" ref="nameField"
            value={this.state.name}
            onChange={this.handleChange.bind(this)}
             />
        </div>
        <div className="form-group">
          <div className="text-right">
            {action}
          </div>
        </div>
      </form>
    );
  }

  handleChange(event) {
    let attribute = event.target.name;
    this.setState({
      [attribute]: event.target.value
    });
  }

  handleAfterCreated(response) {
    let organization = response.data.organization;
      let ORGANIZATION_URL = this.props.url + '/' + organization.id
      window.location.href =  ORGANIZATION_URL;
    this.refs.nameField.value = '';
  }
}
