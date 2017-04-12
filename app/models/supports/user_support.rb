class Supports::UserSupport
  def initialize args = {}
    @params = args[:params]
  end

  def user
    @user ||= User.find_by id: @params[:id]
  end

  def users_serializer
    @users_serializer ||= Serializers::Users::UsersSerializer
      .new(object: @organization.users).serializer
  end

  def user_serializer
    @users_serializer = Serializers::Users::UsersSerializer
      .new(object: user).serializer
  end

  def organizations
    @organizations ||= Organization.all
  end

  def programs
    @programs ||= Program.all
  end

  def roles
    @roles ||= Role.all
  end

  def organization
    @organization ||= Organization.find_by id: @params[:organization_id]
  end 
end
