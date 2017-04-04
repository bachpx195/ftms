class Serializers::Programs::CourseManagersSerializer <
  Serializers::SupportSerializer
  attrs :user_avatar

  def user_avatar
    object.user.avatar.url
  end
end
