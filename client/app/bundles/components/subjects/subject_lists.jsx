import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import Modal from './modal';
import Form from './form';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import * as subject_constants from './subject_constants';

const SUBJECT_URL = app_constants.APP_NAME + subject_constants.SUBJECT_PATH;

export default class SubjectLists extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: props.subjects,
      subject: {}
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

    const Image = ({griddleKey}) => (
      <img src={this.props.subjects[griddleKey].image.url}
        className='thumbnail-image'/>
    );

    const valueNull = ({value}) => (
      <span></span>
    );

    let modalEdit = null;
    if(this.state.subject.id){
      modalEdit = (
        <Modal url={SUBJECT_URL + '/' + this.state.subject.id}
          subject={this.state.subject}
          handleAfterUpdated={this.handleAfterUpdated.bind(this)} />
      );
    }

    return (
      <div>
        <Griddle data={this.state.subjects} plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id="name" title={I18n.t("subjects.headers.name")} />
            <ColumnDefinition id="image" title={I18n.t("subjects.headers.image")}
              customComponent={Image} />
            <ColumnDefinition id="description"
              title={I18n.t("subjects.headers.description")} />
            <ColumnDefinition id="edit" customComponent={ButtonEdit}
              customHeadingComponent={valueNull} />
            <ColumnDefinition id="delete" customComponent={ButtonDelete}
              customHeadingComponent={valueNull} />
          </RowDefinition>
        </Griddle>
        {modalEdit}
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      subject: {}
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.subject.id){
      $('#modalEdit').modal();
    }
  }

  handleEdit(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      subject: this.props.subjects[$target.data('index')]
    });
  }

  handleDelete(event) {
    let $target = $(event.target);
    $target.blur();
    let subject = this.props.subjects[$target.data('index')];
    if(confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(SUBJECT_URL + '/' + subject.id, {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        this.setState({
          subject: {}
        });
        this.props.handleAfterDeleted(subject);
      })
      .catch(error => console.log(error));
    }
  }

  handleAfterUpdated(new_subject) {
    this.setState({
      subject: {}
    });
    this.props.handleAfterUpdated(new_subject);
  }
}
