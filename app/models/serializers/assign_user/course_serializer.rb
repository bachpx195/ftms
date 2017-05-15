class Serializers::AssignUser::CourseSerializer <
  Serializers::SupportSerializer
  attrs :managers, :members, :unassigned_users

  def managers
    Serializers::Courses::CourseMembersSerializer
      .new(object: @course_supports.managers,
      scope: {course: object}).serializer
  end

  def members
    Serializers::Courses::CourseMembersSerializer
      .new(object: @course_supports.members, scope: {course: object}).serializer
  end

  def unassigned_users
    Serializers::Courses::CourseMembersSerializer
      .new(object: @course_supports.unassigned_users, scope: {course: object}).serializer
  end
end
