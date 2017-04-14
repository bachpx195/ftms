class UserServices::CreateUser
  def initialize args = {}
    @user_params = args[:user_params]
  end

  def perform
    default_password = Settings.users.default_password
    User.new @user_params.merge(password: default_password,
      password_confirmation: default_password)
  end
end
