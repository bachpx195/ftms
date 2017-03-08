import React from 'react';
import axios from 'axios';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import FormEdit from './form_edit';
import FormCreate from './form_create';
import * as table_constants from 'constants/griddle_table_constants';
import * as app_constants from 'constants/app_constants';
import * as organization_constants from './organization_constants';

const ORGANIZATION_URL = app_constants.APP_NAME + organization_constants.ORGANIZATION_PATH;

export default class OrganizationLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: null,
      organizations: props.organizations,
      organization: {
        name: ''
      }
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

    const ButtonSubOrganizations = ({griddleKey}) => (
      <button className='btn btn-info' data-index={griddleKey}
        onClick={this.handleCreateSubOrganization.bind(this)}>
        {I18n.t('buttons.create_sub_organization')}
      </button>
    );

    const LinkShowOrganization = ({value, griddleKey}) => (
      <a href={ORGANIZATION_URL + '/' + this.props.organizations[griddleKey].id + '/programs'}>{value}</a>
    );

    const LinkParent = ({griddleKey}) => {
      let parent = this.state.organizations[griddleKey].parent;
      if(parent){
        return <a href={ORGANIZATION_URL + '/' + parent.id + '/programs'}>{parent.name}</a>
      }
      return null;
    };

    return (
      <div>
        <Griddle data={this.state.organizations}
          plugins={[plugins.LocalPlugin]}
          components={{Layout: NewLayout}}
          styleConfig={table_constants.styleConfig}>
          <RowDefinition>
            <ColumnDefinition id='name' title={I18n.t('organizations.name')}
              customComponent={LinkShowOrganization} />
            <ColumnDefinition id='parent_name'
              title={I18n.t('organizations.parent')}
              customComponent={LinkParent} />
            <ColumnDefinition id='SubOrganizations'
              customComponent={ButtonSubOrganizations}
              title={I18n.t('organizations.sub_organization')} />
            <ColumnDefinition id='edit' customComponent={ButtonEdit}
              title={I18n.t('organizations.edit')} />
            <ColumnDefinition id='delete' customComponent={ButtonDelete}
              title={I18n.t('organizations.delete')} />
          </RowDefinition>
        </Griddle>
        {this.renderModal()}
      </div>
    );
  }

  renderModal(){
    let title = '';
    let form = null;
    if(this.state.parent) {
      title = this.state.parent.name;
      form = (<FormCreate parent={this.state.parent} url={ORGANIZATION_URL}
        handleAfterSaved={this.handleAfterCreated.bind(this)} />);
    } else {
      title = I18n.t('organizations.edit');
      form = (<FormEdit organization={this.state.organization}
        organizations={this.state.organizations} url={ORGANIZATION_URL}
        handleAfterSaved={this.handleAfterUpdated.bind(this)} />);
    }

    return (
      <div id='modal' className='modal fade in' role='dialog'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close'
                data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>{title}</h4>
            </div>
            <div className='modal-body'>
              {form}
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleCreateSubOrganization(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      parent: this.props.organizations[$target.data('index')],
      organization: {
        name: ''
      }
    });
    $('#modal').modal();
  }

  handleEdit(event) {
    let $target = $(event.target);
    $target.blur();
    this.setState({
      parent: null,
      organization: this.props.organizations[$target.data('index')]
    });
    $('#modal').modal();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      organizations: nextProps.organizations
     });
  }

  handleAfterCreated(new_organization) {
    this.props.handleAfterCreated(new_organization);
  }

  handleAfterUpdated(new_organization) {
    this.props.handleAfterUpdated(new_organization);
  }

  handleDelete(event) {
    let $target = $(event.target);
    $target.blur();
    let organization = this.props.organizations[$target.data('index')];
    if (confirm(I18n.t('data.confirm_delete'))) {
      axios.delete(ORGANIZATION_URL + '/' + organization.id, {
        params: {
          authenticity_token: ReactOnRails.authenticityToken()
        },
        headers: {'Accept': 'application/json'}
      })
      .then(response => {
        this.props.handleAfterDeleted(organization);
      })
      .catch(error => console.log(error));
    }
  }
}
