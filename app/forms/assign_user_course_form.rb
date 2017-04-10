class AssignUserCourseForm
  include InitUserSubject

  def initialize args = {}
    @course = args[:course]
    @user_courses = args[:user_courses]
  end

  def save
    user_courses = @user_courses.values
    user_course_ids = Array.new
    user_courses.each do |user_course|
      user_course_ids.push(user_course["id"]) if user_course["_destroy"]
    end
    begin
      ActiveRecord::Base.transaction do
        @course.user_courses.where(id: user_course_ids).try :destroy_all
        user_courses.each do |attr|
          next if attr["_destroy"]
          user_course = attr[:type].classify.constantize.with_deleted
            .find_by course_id: @course.id, user_id: attr["user_id"]
          if user_course
            user_course.restore recursive: user_course.is_a?(CourseMember)
          else
            user_course = @course.user_courses.create attr
            init_user_subjects(user_course) if user_course.is_a? CourseMember
          end
        end
      end
      true
    rescue
      false
    end
  end

  private
  def init_user_subjects user_course
    create_user_subjects [user_course], @course.course_subjects
  end
end
