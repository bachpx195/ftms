class RoleFunctionsController < ApplicationController
  before_action :find_role
  before_action :authorize_class

  def update
    if @role.update_attributes function_params
      @function_role = Function.functions_with_role @role.id
      @user_roles = UserRole.where role_id: @role.id
      users_functions = []
      @user_roles.each do |user_role|
        user_role.user.user_functions.delete_all
        @role.functions.each do |function|
          users_functions << user_role.user.user_functions.new(function_id: function.id)
        end
      end
      UserFunction.import users_functions
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
