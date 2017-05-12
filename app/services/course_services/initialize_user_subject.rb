class CourseServices::InitializeUserSubject
  include InitUserSubject

  def initialize args = {}
    @course = args[:course]
    @user_courses = args[:user_courses]
  end

  def perform
    user_courses = @user_courses.values
    user_courses.each do |attr|
      user_course = @course.user_courses.create attr
      init_user_subjects(user_course) if user_course.is_a? CourseMember
    end
  end

  private
  def init_user_subjects user_course
    create_user_subjects [user_course], @course.course_subjects
  end
end
