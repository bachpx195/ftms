class ChangeRole::UsersController < ApplicationController
  before_action :find_user
  before_action :namespace_authorize

  def show
    @user_supports = Supports::UserSupport.new
    query = FunctionUserQuery.new @user.id
    @functions = QueryObject.new(query).exec
    respond_to do |format|
      format.json do
        render json: {
          roles: Serializers::Roles::RolesSerializer
            .new(object: @user.roles).serializer,
          all_roles: Serializers::Roles::RolesSerializer
            .new(object: @user_supports.roles).serializer,
          functions: Serializers::Roles::FunctionsSerializer
            .new(object: @functions).serializer
        }
      end
    end
  end

  def update
    respond_to do |format|
      if params["update_show"] && params["roles"]
        role_ids = params["roles"].map{|r| r["id"]}
        query = FunctionUserWithRoleQuery.new role_ids
        functions = QueryObject.new(query).exec
        format.json do
          render json: {message: flash_message("updated"),
            functions: functions}
        end
      elsif find_role
        update_user_function_service =
          UserServices::UpdateUserFunction.new user_function_params, @user
        update_user_function_service.perform
        format.html{redirect_to @user}
        format.json do
          render json: {message: flash_message("updated"),
            roles: @user.roles}
        end
      else
        format.html{render :edit}
        format.json do
          render json: {message: flash_message("not_updated"),
            errors: @user.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  private
  def find_user
    @user = User.find_by id: params[:id]
    unless @user
      respond_to do |format|
        format.html{redirect_to users_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_role
    @user.user_roles.delete_all
    params[:roles].each do |role|
      user_role = Role.find_by id: role[:id]
      @user.roles << user_role unless @user.roles.include? user_role
    end
  end

  def user_function_params
    params.require(:functions).permit User::ATTRIBUTES_FUNCTION_PARAMS
  end
end
