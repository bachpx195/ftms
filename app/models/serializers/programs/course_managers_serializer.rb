class Serializers::Programs::CourseManagersSerializer <
  Serializers::SupportSerializer
  attrs :user_avatar
  attrs :user_name
  attrs :user_email

  def user_avatar
    object.user.avatar.url
  end

  def user_name
    object.user.name
  end

  def user_email
    object.user.email
  end
end
