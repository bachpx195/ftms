class Serializers::Courses::CourseMembersSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :avatar
  attrs :user_course, if: :check_course

  def avatar
    Hash[:url, object.avatar.url]
  end

  def user_course
    object.user_courses.find_by course_id: course.id
  end

  private
  def check_course
    course.present?
  end
end
