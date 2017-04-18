class Supports::MoveCourseSupport
  def initialize args = {}
    @course = args[:course]
    @user = args[:user]
  end

  def user_course
    @course.user_courses.find_by user_id: @user.id
  end

  def user_subjects
    Serializers::MoveCourse::UserSubjectsSerializer
      .new(object: user_course.user_subjects).serializer
  end

  def subjects
    Serializers::MoveCourse::SubjectsSerializer
      .new(object: @course.subjects).serializer
  end
end
