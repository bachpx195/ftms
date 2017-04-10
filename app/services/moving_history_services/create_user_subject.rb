class MovingHistoryServices::CreateUserSubject
  def initialize args
    @user = args[:user]
    @course = args[:course]
    @reject_course_subjects = args[:reject_course_subjects]
    @user_course = args[:user_course]
  end

  def perform
    begin
      UserSubject.transaction do
        @course.course_subjects.each do |course_subject|
          create_course_subjects course_subject
        end
      end
      true
    rescue
      false
    end
  end

  private
  def create_course_subjects course_subject
    subject_id = course_subject.subject_id
    status = @reject_course_subjects.include?(subject_id) ? "finished" : "init"
    @user.user_subjects.create! course_subject: course_subject,
      user_course: @user_course, subject_id: subject_id, status: status
  end
end
