import React from 'react';

export default class ItemDetail extends React.Component {
  render() {
    return (
      <div className='ts-item-detail col-md-6'>
        <h3>{I18n.t('courses.preview.item_detail')}</h3>
        <div className='table-responsive'>
          <table className='table'>
            <tbody>
              <tr>
                <td><strong>{I18n.t('courses.preview.item_name')}</strong></td>
                <td>{this.props.item.name || ''}</td>
              </tr>
              <tr>
                <td><strong>{I18n.t('courses.preview.item_content')}</strong></td>
                <td>{this.props.item.content || ''}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

}
