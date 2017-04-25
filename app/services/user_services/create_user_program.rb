class UserServices::CreateUserProgram
  def initialize args = {}
    @user_params = args[:user_params]
    @user = args[:user]
  end

  def perform
    UserProgram.create!(user: @user,
      program_id: @user_params[:program_id])
  end
end
