import React from 'react';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import {IntlProvider, FormattedDate} from 'react-intl';
import RequirementEdit from './requirement_edit';
import ModalRequirement from './modal';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
require('../../../assets/sass/projects.scss');

const DEFAULT_IMAGE_USER_URL = app_constants.DEFAULT_IMAGE_USER_URL;

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
      <RequirementEdit requirement={this.state.requirements[griddleKey]}
        handleOnClickEdit={this.handleOnClickEdit.bind(this)}
        handleAfterDelete={this.handleAfterDelete.bind(this)}  />
      );

    const NewLayout = ({Table, Pagination, Filter}) => (
      <div className='col-md-12'>
        <div className='row'>
          <div className='griddle-head clearfix'>
            <div className='col-md-6'>
              <Filter />
            </div>
            <div className='col-md-6 text-right'>
              <Pagination />
            </div>
          </div>
          <div className='col-md-12'>
            <Table />
          </div>
        </div>
      </div>
    );

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
