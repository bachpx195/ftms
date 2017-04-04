class Serializers::AssignUser::CourseSerializer <
  Serializers::SupportSerializer
  attrs :managers, :members, :unassigned_users

  def managers
    Serializers::Courses::CourseMembersSerializer
      .new(object: object.managers, scope: {course: course}).serializer
  end

  def members
    Serializers::Courses::CourseMembersSerializer
      .new(object: object.members, scope: {course: course}).serializer
  end

  def unassigned_users
    Serializers::Users::UsersSerializer
      .new(object: object.unassigned_users).serializer
  end
end
