class RolesController < ApplicationController
  before_action :find_role, only: :show
  before_action :authorize_class

  def index
    @roles = Role.order_by_parent_id
  end

  def show
    query = FunctionRoleQuery.new @role.id
    @function_role = QueryObject.new(query).exec
  end

  def update
    hash = JSON.parse params[:node_array]
    hash["nodeDataArray"].each do |role|
      @role = Role.find_by id: role["key"]
      @role.update_attributes parent_id: role["parent"]
    end
    redirect_to roles_path
  end

  private
  def find_role
    @role = Role.find_by id: params[:id]
    unless @role
      respond_to do |format|
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
