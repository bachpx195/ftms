import React from 'react';
import axios from 'axios';

import * as app_constants from 'constants/app_constants';

const SUBORGANIZATION_PATH = app_constants.APP_NAME + 'sub_organizations'

export default class TreeNode extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      organization: this.props.organization,
      visible: true,
      index: null,
      name: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      organization: nextProps.organization,
      index: nextProps.index,
      name: name
    });
  }

  toggle = () => {
    this.setState({visible: !this.state.visible});
  };

  render() {
    let sub_organization;
    let show = this.state.visible ? 'fa fa-plus':'fa fa-minus';
    let parent = this.props.parent ? 'parent list-group-item': 'parent list-group-item info'
    let number_sub;
    let suborganization_number;
    if(this.state.organization.sub_organizations != null){
      sub_organization = this.state.organization.sub_organizations.map((organization) => {
        let child = organization.sub_organizations.length > 0 ? 'parent-children':'children';
        number_sub = this.state.organization.sub_organizations.length;
        return(
          <div className={child} key={'organization' + organization.id}>
              <TreeNode 
                organization={organization} 
                handleafterClickEdit={this.afterClickEditChildren.bind(this)} 
                handleafterClickCreate={this.afterClickCreateChildren.bind(this)}
                parent={true}/>
          </div>
        )
      });
    }else{
      show = "fa fa-minus";
    }
    if(number_sub > 0){
      suborganization_number = (
        <div className="number-suborganization">
          <small>{number_sub} {I18n.t('organizations.sub_organization')}</small>
        </div>
      )
    }else{
      suborganization_number = (
        <div className="number-suborganization">
          <small>{I18n.t('organizations.nothing')}</small> 
        </div>
      )
    }
    return(
      <div className="list-organization list-group">
        <div className={parent}>
          <div className="organization-info col-xs-6">
            <div className="show inline">
              <i className={show} onClick={this.slideToggle.bind(this)}/>
            </div>
            <div className="name-organization inline">
              <div>
                <a href={SUBORGANIZATION_PATH + '/'+ this.state.organization.id}>
                  {this.state.organization.name}
                </a>
              </div>
            </div>
          </div>
          <div className="function col-xs-6">
            <div className="fl-right">
              <div className="list-function hidden">
                <i className="edit fa fa-pencil" onClick={this.handleEdit.bind(this)} 
                  data-index={this.state.organization.id} 
                  data-name={this.state.organization.name}>
                </i>
                <i className="create fa fa-plus"
                  onClick={this.handleCreate.bind(this)}
                  data-index={this.state.organization.id}>
                </i>
              </div>
              <div className="list-icon">
                <i className="fa fa-bars" onClick={this.slideListFunction.bind(this)}/>
              </div>
            </div>
          </div>
          <div className="clearfix"></div>
        </div>
        {suborganization_number}
        <div className="list-children list-group hidden">
          {sub_organization}
        </div>
      </div>
    )
  }

  afterClickEditChildren(index, name){
    this.props.handleafterClickEdit(index, name)
  }

  afterClickCreateChildren(index){
    this.props.handleafterClickCreate(index)
  }

  slideListFunction(event){
    let target = event.target;
    $(target).blur();
    let listchildren = $(target).parent().siblings('.list-function');
    
    if(listchildren.hasClass('hidden')){
      listchildren.removeClass('hidden');
    }else{
      listchildren.addClass('hidden');
    }
  }

  slideToggle(event){
    let target = event.target;
    $(target).blur();
    
    let childPanel = $(target).closest('.parent').siblings();
    if($(childPanel).hasClass('hidden')){
      $(childPanel).removeClass('hidden');
    }else{
      $(childPanel).addClass('hidden');
    }

    let number_sub = $(target).parent().siblings('.number-suborganization');
    if(number_sub.hasClass('hidden')){
      $(number_sub).removeClass('hidden');
    }else{
      $(number_sub).addClass('hidden');
    }
    this.toggle();
  }

  handleEdit(event){
    let target = event.target;
    $(target).blur();
    let index = $(target).data('index');
    let name = $(target).attr('data-name');
    this.props.handleafterClickEdit(index, name);
  }

  handleCreate(event){
    let target = event.target;
    $(target).blur();
    let index = $(target).data('index');
    this.props.handleafterClickCreate(index);
  }
}
