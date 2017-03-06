class Admin::RolesController < ApplicationController

  def index
    @roles = Role.order_by_parent_id
  end

  def update
    hash = JSON.parse params[:node_array]
    hash["nodeDataArray"].each do |role|
      @role = Role.find_by id: role["key"]
      @role.update_attributes parent_id: role["parent"]
    end
    redirect_to admin_roles_path
  end
end
