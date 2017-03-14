class RoleFunctionsController < ApplicationController
  before_action :find_role
  before_action :authorize_class

  def update
    if @role.update_attributes function_params
      update_user_function = RoleServices::UpdateUserFunction.new @role
      update_user_function.perform
      render json: {functions: @function_role, role: @role}
    else
      render json: {message: flash_message("not_update")},
        status: :not_update
    end
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

  def function_params
    params.permit Role::ATTRIBUTE_PARAMS
  end
end
