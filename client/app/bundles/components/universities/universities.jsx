import React from 'react';
import axios from 'axios';

import * as table_constants from 'constants/griddle_table_constants';

import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import Row from './griddle/row';

import Destroy from "./actions/destroy";
import Update from "./actions/update";
import Header from "./templates/header";

export default class Universities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      universities: props.universities,
      university: {}
    };
    Row.prototype.universities = this.state.universities;
  }

  render() {
    const NewLayout = ({Table, Pagination, Filter}) => (
      <Header Table={Table} Pagination={Pagination} Filter={Filter} />
    );

    const ButtonEdit = ({griddleKey}) => {
      return (
        <Update university={this.state.universities[griddleKey]}
          handleAfterUpdated={this.props.handleAfterUpdated} />
      );
    };

    const ButtonDelete = ({griddleKey}) => {
      return (
        <Destroy university={this.state.universities[griddleKey]}
          handleAfterDeleted={this.props.handleAfterDeleted} />
      );
    };

    return (
      <div>
        <Griddle data={this.state.universities} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout, Row: Row}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id="name" title={I18n.t("universities.name")} />
            <ColumnDefinition id="edit" customComponent={ButtonEdit}
              title=" "/>
            <ColumnDefinition id="delete" customComponent={ButtonDelete}
              title="  " />
          </RowDefinition>
        </Griddle>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      university: {}
    });
  }
}
