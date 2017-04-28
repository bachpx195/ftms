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
    organizations = (@current_user.organizations +
      Organization.belongs_to_creator(@current_user.id)).uniq
    organizations = @current_user.profile.organization if organizations.empty?
    @organizations = Serializers::Organizations::OrganizationsSerializer
      .new(object: organizations, scope: {show_program: true}).serializer
  end
end
