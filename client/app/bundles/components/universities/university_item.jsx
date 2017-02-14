import React from 'react';

export default class UniversityItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };
  }

  renderUniversitiesSection() {
    const {name} = this.props;

    if (this.state.isEditing) {
      return (
        <td>
          <form onSubmit={this.onSaveClick.bind(this)}>
            <div className='form-group'>
              <input type='text' className='form-control' defaultValue={name} ref='editInput' />
            </div>
          </form>
        </td>
      );
    }

    return(
      <td>
        {name}
      </td>
    );
  }

  renderActionsSection() {
    if (this.state.isEditing) {
      return (
        <td>
          <button className='btn btn-primary' onClick={this.onSaveClick.bind(this)}>
            {I18n.t('buttons.save')}
          </button>
          <button className='btn btn-default' onClick={this.onCancelClick.bind(this)}>
            {I18n.t('buttons.cancel')}
          </button>
        </td>
      );
    }

    return (
      <td>
        <button className='btn btn-success' onClick={this.onEditClick.bind(this)}>
          {I18n.t('buttons.edit')}
        </button>
        <button className='btn btn-danger' onClick={this.props.deleteUniversity.bind(this, this.props)}>
          {I18n.t('buttons.delete')}
        </button>
      </td>
    );
  }

  render () {
    return (
      <tr>
        {this.renderUniversitiesSection()}
        {this.renderActionsSection()}
      </tr>
    );
  }

  onEditClick() {
    this.setState({isEditing: true});
  }

  onCancelClick() {
    this.setState({isEditing: false});
  }

  onSaveClick(event) {
    event.preventDefault();

    const newName = this.refs.editInput.value;
    this.props.updateUniversity(this.props, newName);
    this.setState({isEditing: false});
  }

  onDeleteClick(event) {
    event.preventDefault();

    const nameToDelete = this.props.name;
    this.props.deleteUniversity(nameToDelete);
  }
}
