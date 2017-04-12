import Griddle, {plugins, RowDefinition, ColumnDefinition} from 'griddle-react';
import React from 'react';

export const NewLayout =
  ({Table, Pagination, Filter}) => (
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
