import React from 'react';

export default class RenderTextButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: props.showForm
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showForm: nextProps.showForm
    });
  }

  render() {
    return(
      <div>
        {this.renderText()}
      </div>
    );
  }

  renderText() {
    if (this.state.showForm) {
      return (<div>{I18n.t('buttons.cancel')}</div>);
    } else {
      return (
        <div><i className="fa fa-pencil"></i>{I18n.t('buttons.edit')}</div>);
    }
  }
}
