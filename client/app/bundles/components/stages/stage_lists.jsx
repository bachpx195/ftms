import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import Modal from './modal';
import Form from './form';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import * as stage_constants from './stage_constants';

const STAGE_URL = app_constants.APP_NAME + stage_constants.ADMIN_STAGE_PATH;

export default class StageLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stages: props.stages,
      stage: {}
    }
  }

  render() {
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

    const ButtonEdit = ({griddleKey}) => (
      <button className='btn btn-info' data-index={griddleKey}
        onClick={this.handleEdit.bind(this)}>
        {I18n.t('buttons.edit')}
      </button>
    );

    const ButtonDelete = ({griddleKey}) => (
      <button className='btn btn-danger' data-index={griddleKey}
        onClick={this.handleDelete.bind(this)}>
        {I18n.t('buttons.delete')}
      </button>
    );

    let modalEdit = null;
    if(this.state.stage.id){
      modalEdit = (
        <Modal url={STAGE_URL + '/' + this.state.stage.id}
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      stage: {}
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.stage.id){
      $('#modalEdit').modal();
    }
  }

  handleEdit(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      stage: this.props.stages[$target.data('index')]
    });
  }

  handleDelete(event) {
    let $target = $(event.target);
    $target.blur();
    let stage = this.props.stages[$target.data('index')];
    if(confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(STAGE_URL + '/' + stage.id, {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        this.setState({
          stage: {}
        });
        this.props.handleAfterDeleted(stage);
      })
      .catch(error => console.log(error));
    }
  }

  handleAfterUpdated(new_stage) {
    this.setState({
      stage: {}
    });
    this.props.handleAfterUpdated(new_stage);
  }
}
