import React from 'react';
import _ from 'lodash';
import * as routes from 'config/routes';

require('../../assets/sass/sub_organization.scss');

export default class TreeNode extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      node: props.node,
      programs: props.programs,
      slide: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      node: nextProps.node,
      programs: nextProps.programs
    });
  }

  render() {
    return(
      <div className={`${this.props.node.parent == 'null' ?
        'parent_program' : 'sub-node'}`}>
        <ul className='list-group'>
          <li className={`${this.props.node.parent == 'null' ?
            'list-group-item list-group-item-info' : 'list-group-item'}`}>

            <div className='col-md-1 pull-left'>
              <i className='fa fa-plus cursor'
                title={I18n.t('sub_organizations.all_sub_program')}
                onClick={this.onClickNode.bind(this)} aria-hidden='true'>
              </i>
            </div>

            <b>{I18n.t('sub_organizations.name')}</b>
            <a className='title_node cursor'
              title={this.props.node.text}
              href={routes.sub_organization_url(this.props.organization.id) +
                '/programs/' + this.props.node.id}>
              {this.props.node.text}
            </a>

            <i className='fa fa-bars pull-right cursor'
              title={I18n.t('sub_organizations.menu_manager_program')}
              aria-hidden='true'
              onClick={this.onClickMenuHandle.bind(this)}>
            </i>

            <ul className='list-inline pull-right hidden
              animation' data-index={this.props.node.id}>
              <li>
                <i className='fa fa-pencil pull-right cursor'
                  title={I18n.t('sub_organizations.update_program')}
                  onClick={this.onClickEditProgram.bind(this)}
                  aria-hidden='true'
                  data-name={this.props.node.text}
                  data-id={this.props.node.id}>
                </i>
              </li>
              <li><i className='fa fa-plus pull-right cursor'
                title={I18n.t('sub_organizations.new_sub_program')}
                onClick={this.onClickCreate.bind(this)}
                aria-hidden='true'
                data-parent={this.props.node.id}></i>
              </li>
            </ul>
          </li>
           <li className='list-group-item list-group-item-action flex-column align-items-start nothing hidden'>
            <div className='d-flex w-100 justify-content-between'>
              <h5 className='mb-1'>
                {this.props.children.length > 0 ?
                  <small>{I18n.t('sub_organizations.sub_program',
                  {number: this.props.children.length})}</small> :
                  <small>{I18n.t('sub_organizations.nothing')}</small>
                }
              </h5>
            </div>
          </li>
          {this.state.slide ? this.renderSubNode(this.props.children) : ''}
        </ul>
      </div>
    );
  }

  renderSubNode(nodes) {
    return _.map(nodes, node => {
      if(node.nodes == []) {
        return null;
      }else {
        return(
          <TreeNode
            organization={this.props.organization}
            handleonClickEdit={this.handleonClickEdit.bind(this)}
            handleonClickCreate={this.handleonClickCreate.bind(this)}
            key={node.id}
            node={node}
            children={node.nodes}
          />
        );
      }
    })
  }

  onClickEditProgram(event) {
    let target = event.target;
    let name = $(target).data('name');
    let id =  $(target).data('id');
    this.props.handleonClickEdit(name, id);
    $('#modalNode').modal();
  }

  handleonClickEdit(name, id) {
    this.props.handleonClickEdit(name, id);
  }

  handleonClickCreate(parent) {
    this.props.handleonClickCreate(parent);
  }

  onClickCreate(event) {
    let target = event.target;
    let parent = $(target).data('parent');
    $('#modalNode').modal();
    this.props.handleonClickCreate(parent);
  }

  onClickNode(event) {
    let target = event.target
    if($(target).hasClass('fa-plus')){
      $(target).closest('ul').find('.nothing').removeClass('hidden');
      $(target).removeClass('fa-plus').addClass('fa-minus');
      this.setState({
        slide: true
      });
    } else {
      $(target).closest('ul').find('.nothing').addClass('hidden');
      $(target).removeClass('fa-minus').addClass('fa-plus');
      this.setState({
        slide: false
      });
    }
  }

  onClickMenuHandle(event) {
    let target = event.target;
    if($(target).next().hasClass('hidden')) {
      $('.animation').addClass('hidden');
      $(target).next().removeClass('hidden');
    }else {
      $(target).next().addClass('hidden');
    }
  }
}
