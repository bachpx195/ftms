import React from 'react';

export default class UniversityCreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: null
    };
  }

  renderErrors() {
    if (!this.state.errors) {return null;}

    return <div style={{color: 'red'}}>{this.state.errors}</div>
  }

  render() {
    return (
      <form onSubmit={this.handleCreate.bind(this)}>
        <div className='form-group'>
          <input type='text' placeholder={I18n.t('universities.headers.name')} ref='createInput'
            className='form-control' />
        </div>
        <div className='pull-right'>
          <input type="submit" name="commit" defaultValue={I18n.t('buttons.save')}
            className="btn btn-primary text-right" />
        </div>
        {this.renderErrors()}
      </form>
    );
  }

  handleCreate(event) {
    event.preventDefault();

    const createInput = this.refs.createInput;
    const name = createInput.value;
    const validateInput = this.validateInput(name);

    if (validateInput) {
      this.setState({ errors: validateInput });
      return;
    }

    this.setState({errors: null});
    this.props.createUniversity(name);
    this.refs.createInput.value = '';
  }

  validateInput(name) {
    if (!name) {
      return 'Please enter a task.';
    } else if (_.find(this.props.universities, university => university.name === name)) {
      return 'Name already exists.';
    } else {
      return null;
    }
  }
}
