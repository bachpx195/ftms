class MovingHistoryServices::MovingCourse
  include MovingHistory

  def initialize args
    @user = args[:user]
    @source = args[:source]
    @destination = args[:destination]
    @reject_course_subjects = args[:reject_course_subjects]
    @params = args[:params]
  end

  def perform
    @user_course = @user.user_courses.build course_id: @destination.id
    if find_course_subjects(@destination, @user, @reject_course_subjects)
      @user_course.save
      MovingHistoryServices::MovingCourse.new.create_moving_history @user, @params
    else
      false
    end
  end

  private
  def find_course_subjects course, user, reject_course_subjects
    user_subject_service = MovingHistoryServices::CreateUserSubject
      .new course: course, user: user,
      reject_course_subjects: reject_course_subjects
    user_subject_service.perform
  end
end
