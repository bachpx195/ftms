import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import { NewLayout } from '../shareds/griddles/new_layout';
import Row from './griddle/row';
import Destroy from "./actions/destroy";
import Update from "./actions/update";
import UniversityPolicy from 'policy/university_policy';
import ModalEdit from './templates/modal';

import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import * as university_constants from './constants/university_constants';

const UNIVERSITY_URL = app_constants.APP_NAME + university_constants.UNIVERSITY_PATH;

export default class Universities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      universities: props.universities,
      university: {}
    };
    Row.prototype.universities = this.state.universities;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected_university: {}
    });
  }

  render() {
    {NewLayout}

    const ButtonEdit = ({griddleKey}) => {
      let university = this.state.universities[griddleKey];
      return (
        <UniversityPolicy
          permit={[
            {action: ['update', 'creator'], target: 'children',
            data: {creator_id: university.creator_id}}]}>
          <button className='btn btn-info' data-index={griddleKey}
            onClick={this.handleEdit.bind(this)}>
            <i className="fa fa-pencil-square-o"></i>
            &nbsp;{I18n.t('buttons.edit')}
          </button>
        </UniversityPolicy>
      );
    };

    const ButtonDelete = ({griddleKey}) => {
      return (
        <Destroy university={this.state.universities[griddleKey]}
          handleAfterDeleted={this.props.handleAfterDeleted} />
      );
    };

    let modalEdit = null;
    if(this.state.university.id){
      modalEdit = (
        <ModalEdit
          url={UNIVERSITY_URL + '/' + this.state.university.id}
          university={this.state.university}
          handleAfterUpdated={this.props.handleAfterUpdated} />
      );
    }

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
        {modalEdit}
      </div>
    );
  }

  setUniversity(selected_university) {
    this.setState({
      selected_university: selected_university
    });
  }

  handleEdit(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      university: this.state.universities[$target.data('index')]
    }, () => {
      $('.modal-edit').modal();
    });
  }
}
