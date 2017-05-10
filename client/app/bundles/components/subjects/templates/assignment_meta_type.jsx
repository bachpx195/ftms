import React from 'react';
import axios from 'axios';
import * as routes from 'config/routes';

export default class AssignmentMetaType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meta_types: props.meta_types || [],
      name: '',
      meta_types_checked: props.meta_types_checked || [],
      subject: props.subject
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      meta_types_checked: nextProps.meta_types_checked,
      subject: nextProps.subject
    })
  }

  render () {
    return (
      <div className="meta-types-assignment pull-left">
        {this.props.permit_create_meta_type ? (
          <button className="btn btn-info"
            title={I18n.t("assignments.create_other_meta_type")}
            onClick={this.handleOpenFormMetaType.bind(this)}>
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
        ) : ('')}

        <form className="form-inline form-meta-type hidden">
          <input className="form-control input-meta-type"
            placeholder={I18n.t("assignments.create_meta_type")}
            name="name" ref="nameField"
            onChange={this.handleChange.bind(this)}/>
          <button className="btn btn-info"
            onClick={this.handleCreateMetaty.bind(this)}>
            {I18n.t("assignments.create_meta_type")}
          </button>
        </form>
        <div>
          {this._renderCheckboxMetaType(this.state.meta_types)}
        </div>
      </div>
    );
  }

  _renderCheckboxMetaType(meta_types) {
    return (
      meta_types.map(meta_type => {
        let checked = false;
        this.state.meta_types_checked.map(value => {
          if (value.id == meta_type.id) {
            checked = true;
          }
        })
        return (
          <div className="list-input cursor" key={meta_type.id}
            onClick={this.onCheckedMetatype.bind(this, meta_type)}>
            <input type="checkbox" value={meta_type.name}
              checked={checked}
              name={meta_type.name}
              readOnly
            /> {meta_type.name}
          </div>
        );
      })
    );
  }

  handleOpenFormMetaType(event) {
    event.preventDefault();
    if ($('.form-meta-type').hasClass('hidden')) {
      $('.form-meta-type').removeClass('hidden');
    } else {
      $('.form-meta-type').addClass('hidden');
    }
  }

  handleChange(event) {
    let attribute = event.target.name;
    this.setState({
      [attribute]: event.target.value
    });
  }

  onCheckedMetatype(meta_type, event) {
    if ($($(event.target).find('input')).is(':checked')) {
      let index = this.state.meta_types_checked.findIndex(value => value.id == meta_type.id)
      if (index > -1) {
        this.state.meta_types_checked.splice(index, 1);
      }
    } else {
      this.state.meta_types_checked.push(meta_type);
    }
    this.props.handleAfterChecked(this.state.meta_types_checked);
  }

  handleCreateMetaty(event) {
    event.preventDefault();
    let subject_id = this.state.subject ? this.state.subject.id : '';
    axios.post(routes.meta_types_url() + '.json', {
      subject_id: subject_id,
      meta_type: {
        name: this.state.name
      },
      authenticity_token: ReactOnRails.authenticityToken()
    })
    .then(respone => {
      this.props.handleAfterCreated(respone.data.meta_type);
      $('.form-meta-type').addClass('hidden');
      this.refs.nameField.value = '';
    })
    .catch(error => {
      console.log(error)
    })
  }
}
