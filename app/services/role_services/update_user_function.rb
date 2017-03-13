class RoleServices::UpdateUserFunction
  def initialize role
    @role = role
  end

  def perform
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
  end
end
