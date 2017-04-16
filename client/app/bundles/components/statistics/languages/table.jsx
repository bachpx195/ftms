import axios from 'axios';
import React from 'react';
import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import { NewLayout } from '../../shareds/griddles/new_layout';
import * as table_constants from 'constants/griddle_table_constants';

export default class StatisticsLanguageBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trainees_by_languages_table: props.trainees_by_languages_table
    };
  }

  render() {
    {NewLayout}

    return (
      <div className='box box-success'>
        <div className='box-header with-border'>
          <h3 className='box-title'>{I18n.t('statistics.languages.title')}</h3>

          <div className="box-tools pull-right">
            <button type="button" className="btn btn-box-tool" data-widget="collapse">
              <i className="fa fa-minus"></i>
            </button>
            <button type="button" className="btn btn-box-tool" data-widget="remove">
              <i className="fa fa-times"></i>
            </button>
          </div>
        </div>

        <div className='box-body no-padding'>
          <div>
            <Griddle data={this.state.trainees_by_languages_table}
              plugins={[plugins.LocalPlugin]}
              components={{Layout: NewLayout}}
              styleConfig={table_constants.styleConfig}>
              <RowDefinition>
                <ColumnDefinition id="organization_name"
                  title={I18n.t("statistics.languages.headers.organization")} />
                <ColumnDefinition id="language_name"
                  title={I18n.t("statistics.languages.headers.language")}/>
                <ColumnDefinition id="number"
                  title={I18n.t("statistics.languages.headers.number")} />
              </RowDefinition>
            </Griddle>
          </div>
        </div>
      </div>
    );
  }
}
