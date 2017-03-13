class UserServices::UpdateUserFunction
  def initialize functions, user
    @functions = functions
    @user = user
  end

  def perform
    @user.user_functions.destroy_all
    @user.update_attributes @functions
  end
end
