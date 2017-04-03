class MovingHistoryServices::CreateUserSubject
  def initialize args
    @user = args[:user]
    @course = args[:course]
    @reject_course_subjects = args[:reject_course_subjects]
  end

  def perform
    begin
      UserSubject.transaction do
        @course.course_subjects.each do |course_subject|
          unless @reject_course_subjects.include? course_subject.id
            @user.user_subjects.create! course_subject: course_subject
          end
        end
      end
      true
    rescue
      false
    end
  end
end
