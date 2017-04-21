import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import Modal from './modal';
import Form from './form';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';

const TRAINEE_TYPES_URL = app_constants.APP_NAME + 
  app_constants.TRAINEE_TYPES_PATH;

export default class TraineeTypeLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trainee_types: props.trainee_types,
      trainee_type: {}
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
        <i className="fa fa-pencil-square-o"></i>
        &nbsp;{I18n.t('buttons.edit')}
      </button>
    );

    const ButtonDelete = ({griddleKey}) => (
      <button className='btn btn-danger' data-index={griddleKey}
        onClick={this.handleDelete.bind(this)}>
        <i className="fa fa-trash"></i>
        &nbsp;{I18n.t('buttons.delete')}
      </button>
    );

    let modalEdit = null;
    if(this.state.trainee_type.id){
      modalEdit = (
        <Modal url={TRAINEE_TYPES_URL + '/' + this.state.trainee_type.id}
          trainee_type={this.state.trainee_type}
          handleAfterUpdated={this.handleAfterUpdated.bind(this)} />
      );
    }

    return (
      <div>
        <Griddle data={this.state.trainee_types} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id="name" title={I18n.t("trainee_types.name")} />
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
      trainee_type: {}
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.trainee_type.id){
      $('#modalEdit').modal();
    }
  }

  handleEdit(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      trainee_type: this.props.trainee_types[$target.data('index')]
    });
  }

  handleDelete(event) {
    let $target = $(event.target);
    $target.blur();
    let trainee_type = this.props.trainee_types[$target.data('index')];
    if(confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(TRAINEE_TYPES_URL + '/' + trainee_type.id, {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        this.setState({
          trainee_type: {}
        });
        this.props.handleAfterDeleted(trainee_type);
      })
      .catch(error => console.log(error));
    }
  }

  handleAfterUpdated(new_trainee_type) {
    this.setState({
      trainee_type: {}
    });
    this.props.handleAfterUpdated(new_trainee_type);
  }
}
