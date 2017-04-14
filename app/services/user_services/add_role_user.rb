class UserServices::AddRoleUser
  def initialize args = {}
    @user = args[:user]
  end

  def perform
    @user.roles << Role.find_by(name: "trainee")
    @user.functions << Role.find_by(name: "trainee").functions
  end
end
