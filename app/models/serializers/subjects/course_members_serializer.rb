class Serializers::Subjects::CourseMembersSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :avatar, :email

  def avatar
    Hash[:url, object.avatar.url]
  end
end
