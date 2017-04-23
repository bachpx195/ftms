import React from 'react';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import { NewLayout } from '../../shareds/griddles/new_layout';
import {IntlProvider, FormattedDate} from 'react-intl';
import Update from '../actions/update';
import ModalRequirement from '../templates/modal';
import * as table_constants from 'constants/griddle_table_constants';
require('../../../assets/sass/projects.scss');

export default class RequirementGriddle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requirements: props.requirements,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      requirements: nextProps.requirements,
    });
  }

  render() {
    const Buttons = ({value, griddleKey}) => (
      <Update requirement={this.state.requirements[griddleKey]}
        handleOnClickEdit={this.handleOnClickEdit.bind(this)}
        handleAfterDelete={this.handleAfterDelete.bind(this)}  />
      );

    {NewLayout}

    return (
      <div>
        <Griddle data={this.state.requirements} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id='name'
              title={I18n.t('projects.headers.name')} />
            <ColumnDefinition id='priority'
              title={I18n.t('projects.priority')} />
            <ColumnDefinition id='requirement' title=' '
              customComponent={Buttons} />
          </RowDefinition>
        </Griddle>
      </div>
    );
  }

  handleOnClickEdit(requirement, url) {
    this.props.handleOnClickEdit(requirement, url);
  }

  handleAfterDelete(deleted_requirement) {
    _.remove(this.state.requirements,
      requirement => requirement.id === deleted_requirement.id);
    this.setState({requirements: this.state.requirements});
  }
}
