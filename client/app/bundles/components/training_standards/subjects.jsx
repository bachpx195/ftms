import * as table_constants from 'constants/griddle_table_constants';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import Header from './templates/header';
import React from 'react';
import Reject from './actions/reject';
import {NewLayout} from 'shared/griddles/new_layout';

export default class Subjects extends React.Component {
  render() {
    const ButtonReject = ({griddleKey}) => (
      <Reject afterRejectSubject={this.props.afterRejectSubject}
        selected_subjects={this.props.selected_subjects}
        standard_subject_url={this.props.standard_subject_url}
        training_standard={this.props.training_standard}
        index={griddleKey}
      />
    );

    const DescriptionSubject =({value, griddleKey}) => (
      <p title={value}>{value}</p>
    );

    const LinkShowSubject = ({value, griddleKey}) => (
      <a href={this.props.subject_url + '/' +
        this.props.selected_subjects[griddleKey].id}>{value}</a>
    );

    return (
      <div className='box box-success'>
        <div className='row'>
          <Header evaluation_template={this.props.evaluation_template}
            training_standard={this.props.training_standard}
            organization={this.props.organization}
            share_with_organization={this.props.share_with_organization}
            standard_organizations={this.props.standard_organizations} />
          <Griddle data={this.props.selected_subjects}
            plugins={[plugins.LocalPlugin]}
            components={{Layout: NewLayout}}
            styleConfig={table_constants.styleConfig}>
            <RowDefinition>
              <ColumnDefinition id='name'
                title={I18n.t('subjects.headers.name')}
                customComponent={LinkShowSubject} />
              <ColumnDefinition id='description'
                title={I18n.t('subjects.headers.description')}
                customComponent={DescriptionSubject}/>
              <ColumnDefinition id='reject' title=' '
                customComponent={ButtonReject} />
            </RowDefinition>
          </Griddle>
        </div>
      </div>
    );
  }
}
