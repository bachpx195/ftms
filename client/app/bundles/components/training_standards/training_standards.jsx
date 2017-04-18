import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import Modal from './templates/modal';
import Form from './templates/form';
import Destroy from "./actions/destroy";
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import * as training_standard_constants from './constants/training_standard_constants';

export default class TrainingStandards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps});
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
        title={I18n.t('buttons.edit')}
        onClick={this.handleEdit.bind(this)}>
        <i className='fa fa-pencil-square-o'></i> {I18n.t('buttons.edit')}
      </button>
    );

    const ButtonDelete = ({griddleKey}) => {
      return (
        <Destroy training_standard={this.state.training_standards[griddleKey]}
          organization={this.state.organization}
          handleAfterDeleted={this.props.handleAfterDeleted} />
      );
    };

    const TRAINING_STANDARD_URL = app_constants.APP_NAME +
      training_standard_constants.ORGANIZATION_PATH + '/' +
      this.props.organization.id + '/' +
      training_standard_constants.TRAINING_STANDARD_PATH;

    const LinkToStandardShow = ({value, griddleKey}) => (
      <a data-index={griddleKey} href={TRAINING_STANDARD_URL + "/" +
        this.state.training_standards[griddleKey].id} title={value}>{value}</a>
    );

    let modalEdit = null;
    if(this.state.training_standard && this.state.training_standard.id) {
      modalEdit = (
        <Modal url={TRAINING_STANDARD_URL + '/' + this.state.training_standard.id}
          training_standard={this.state.training_standard}
          handleAfterUpdated={this.props.handleAfterUpdated} />
      );
    }

    return (
      <div>
        <Griddle data={this.state.training_standards} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id="name" title={I18n.t('training_standards.name')}
              customComponent={LinkToStandardShow}/>
            <ColumnDefinition id="description"
              title={I18n.t('training_standards.description')} />
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
      training_standard: this.state.training_standards[$target.data('index')]
    }, () => {
      $('.modal-edit').modal();
    });
  }

  handleAfterUpdated(new_training_standard) {
    this.props.handleAfterUpdated(new_training_standard);
  }
}
