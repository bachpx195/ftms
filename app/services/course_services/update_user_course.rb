class CourseServices::UpdateUserCourse
  def initialize course
    @course = course
  end

  def perform
    if @course.finished?
      @course.user_courses.each do |user_course|
        user_course.finished!
      end
    end
  end
end
