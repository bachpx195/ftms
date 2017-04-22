import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import ModalEdit from './templates/modal_edit';
import Form from './templates/form';
import Destroy from './actions/destroy';
import { NewLayout } from '../shareds/griddles/new_layout';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import StagePolicy from 'policy/stage_policy';

const STAGES_URL = app_constants.APP_NAME + app_constants.STAGES_PATH;

export default class StageLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stages: props.stages,
      stage: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      stage: {}
    });
  }

  render() {
    {NewLayout}

    const ButtonEdit = ({griddleKey}) => {
      let stage = this.state.stages[griddleKey];
      return(
        <StagePolicy
          permit={[
            {action: ['update', 'creator'], target: 'children',
            data: {creator_id: stage.creator_id}}]}>
          <button className='btn btn-info' data-index={griddleKey}
            onClick={this.handleEdit.bind(this)}>
            <i className="fa fa-pencil-square-o"></i>
            &nbsp;{I18n.t('buttons.edit')}
          </button>
        </StagePolicy>
      );
    };

    const ButtonDelete = ({griddleKey}) => {
      let stage = this.state.stages[griddleKey];
      return(
        <StagePolicy
          permit={[
            {action: ['destroy', 'creator'], target: 'children',
            data: {creator_id: stage.creator_id}}]}>
          <Destroy
            url={STAGES_URL}
            stage={this.state.stages[griddleKey]}
            handleAfterDeleted={this.props.handleAfterDeleted}
          />
        </StagePolicy>
      );
    };

    let modalEdit = null;
    if(this.state.stage.id){
      modalEdit = (
        <ModalEdit url={STAGES_URL + '/' + this.state.stage.id}
          stage={this.state.stage}
          handleAfterUpdated={this.handleAfterUpdated.bind(this)} />
      );
    }

    return (
      <div>
        <Griddle data={this.state.stages} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id="name" title={I18n.t("stages.name")} />
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

  handleEdit(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      stage: this.props.stages[$target.data('index')]
    }, () => {
      $('#modalEdit').modal();
    });
  }

  handleAfterUpdated(new_stage) {
    this.setState({
      stage: {}
    });
    this.props.handleAfterUpdated(new_stage);
  }
}
