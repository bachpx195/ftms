class Supports::StaticPage
  def initialize args = {}
    @current_user = args[:user]
  end

  def languages
    @languages = Language.all
  end

  def courses
    @courses = Course.all
  end

  def user
    @user ||= @current_user
  end

  def user_serializer
    @users_serializer = Serializers::Users::UsersSerializer
      .new(object: user).serializer
  end

  def organizations
    @organizations = user.organizations
    if @organizations.empty?
      @organizations = user.profile.organization
    end
    @organizations
  end
end
