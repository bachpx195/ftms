class MovingHistoryServices::MovingCourse
  include MovingHistoryUtil

  def initialize args = {}
    @args = args
    @params = args[:params]
  end

  def perform
    begin
      UserCourse.transaction do
        rejected_source_course
        create_course_member
        rejected_team
      end
    rescue
      false
    end
  end

  private

  def user_course
    CourseMember.find_by course: @args[:source], user: @args[:user]
  end

  def rejected_source_course
    user_course.rejected! if user_course
  end

  def rejected_team
    user_course.user_subjects.map do |user_subject|
      user_subject.update_attributes(team_id: nil) if user_subject.team_id.present?
    end
  end

  def create_course_member
    user = @args[:user]
    user_course = @args[:destination].course_members.create! status: "in_progress",
      user_id: user.id
    if user_course
      create_user_subjects user_course
      create_moving_history user, @params
    end
  end

  def create_user_subjects user_course
    user_subject_service = MovingHistoryServices::CreateUserSubject
      .new reject_course_subjects: @args[:reject_course_subjects],
      user_course: user_course, user: @args[:user], course: @args[:destination]
    user_subject_service.perform
  end
end
