class RoleServices::UpdateUserFunction
  def initialize role
    @role = role
  end

  def perform
    user_ids = @role.user_roles.pluck :user_id
    role_ids = UserRole.role_by_user user_ids
    role_ids.each do |value|
      role = Role.find_by id: value
      @user_roles = UserRole.where role_id: role.id
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
end
