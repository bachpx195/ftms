import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import Modal from './modal';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import * as evaluation_template_constants from './evaluation_template_constants';

export default class EvaluationStandardsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      evaluation_standards: props.evaluation_standards,
      evaluation_standard: {},
      evaluation_template: props.evaluation_template
    }
  }

  componentWillReceiveProps(nextProps) {
    this.state = {
      evaluation_standards: nextProps.evaluation_standards,
      evaluation_standard: {},
      evaluation_template: nextProps.evaluation_template
    }
  }

  render() {
    const NewLayout = ({Table, Pagination, Filter}) => (
      <div className='row'>
        <div className='col-md-12'>
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

    let modal = null;
    if(this.state.evaluation_standard.id){
      let url = app_constants.APP_NAME +
        evaluation_template_constants.EVALUATION_TEMPLATES_PATH +
        this.props.evaluation_template.id + '/' +
        evaluation_template_constants.EVALUATION_STANDARDS_PATH +
        this.state.evaluation_standard.id;
      modal = (
        <Modal url={url}
          evaluation_standard={this.state.evaluation_standard}
          handleAfterSaved={this.handleAfterUpdated.bind(this)} />
      );
    } else {
      let url = app_constants.APP_NAME +
        evaluation_template_constants.EVALUATION_TEMPLATES_PATH +
        this.props.evaluation_template.id + '/' +
        evaluation_template_constants.EVALUATION_STANDARDS_PATH;
      modal = (
        <Modal url={url}
          evaluation_standard={this.state.evaluation_standard}
          handleAfterSaved={this.handleAfterCreated.bind(this)} />
      );
    }

    let buttonNew = null;
    if(this.state.evaluation_template &&
      Object.keys(this.state.evaluation_template).length > 0) {
      buttonNew = <button className="btn btn-info"
        onClick={this.handleNew.bind(this)}>
        {I18n.t('evaluation_templates.modals.new_evaluation_standard')}
      </button>;
    }

    return (
      <div className='row'>
        <div className='col-md-12'>
          {buttonNew}
        </div>
        <Griddle data={this.state.evaluation_standards} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id='name'
              title={I18n.t('evaluation_standards.headers.name')} />
            <ColumnDefinition id='min_point'
              title={I18n.t('evaluation_standards.headers.min_point')} />
            <ColumnDefinition id='max_point'
              title={I18n.t('evaluation_standards.headers.max_point')}  />
            <ColumnDefinition id='average_point'
              title={I18n.t('evaluation_standards.headers.average_point')}  />
            <ColumnDefinition id='edit' title=' '
              customComponent={ButtonEdit} />
            <ColumnDefinition id='delete' title='  '
              customComponent={ButtonDelete} />
          </RowDefinition>
        </Griddle>
        {modal}
      </div>
    );
  }

  handleNew(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      evaluation_standard: {}
    });
    $('#modal').modal();
  }

  handleEdit(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      evaluation_standard: this.props.evaluation_standards[$target.data('index')]
    });
    $('#modal').modal();
  }

  handleDelete(event) {
    let $target = $(event.target);
    $target.blur();
    let evaluation_standard = this.props.evaluation_standards[$target.data('index')];
    if(confirm(I18n.t('data.confirm_delete'))) {
      let url = app_constants.APP_NAME +
        evaluation_template_constants.EVALUATION_TEMPLATES_PATH +
        this.props.evaluation_template.id + '/' +
        evaluation_template_constants.EVALUATION_STANDARDS_PATH +
        evaluation_standard.id;
      axios.delete(url, {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        this.props.handleAfterDeleted(evaluation_standard);
      })

    }
  }

  handleAfterUpdated(new_evaluation_standard) {
    this.props.handleAfterUpdated(new_evaluation_standard);
  }

  handleAfterCreated(new_evaluation_standard) {
    this.props.handleAfterCreated(new_evaluation_standard);
  }
}
