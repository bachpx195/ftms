class MovingHistoryServices::MovingCourse
  include MovingHistoryUtil

  def initialize args = {}
    @args = args
    @params = args[:params]
  end

  def perform
    begin
      UserCourse.transaction do
        reject_source_user_course
        move user_course_destination
        reject_user_subjects user_course_source
      end
    rescue
      false
    end
  end

  private

  def user_course_source
    CourseMember.find_by course: @args[:source], user: @args[:user]
  end

  def reject_source_user_course
    if user_course_source
      user_course_source.rejected!
      rejected_team
    end
  end

  def reject_user_subjects user_course_source
    user_course_source.user_subjects.
      where.not(status: "finished").update_all status: "rejected"
  end

  def rejected_team
    user_course_source.user_subjects.map do |user_subject|
      user_subject.update_attributes(team_id: nil) if user_subject.team_id.present?
    end
  end

  def user_course_destination
    user_course = CourseMember.find_by course: @args[:destination],
      user: @args[:user]
    status = @args[:destination].status
    if user_course.present? && user_course.rejected?
      user_course.update_attributes status: status
    else
      user_course = @args[:user].course_members.create course:
        @args[:destination], status: status
    end
    user_course
  end

  def move user_course_destination
    @args[:destination].course_subjects.map do |course_subject|
      destination_user_subject = course_subject.user_subjects
        .find_by user: @args[:user], user_course: user_course_destination

      status = get_status_user_subject_source course_subject

      if destination_user_subject.present?
        destination_user_subject.update_attributes status: status
      else
        @args[:user].user_subjects.create! course_subject: course_subject,
          user_course: user_course_destination,
          subject_id: course_subject.subject_id, status: status
      end
    end
  end

  def get_status_user_subject_source course_subject_destination
    user_subject_source =
      user_course_source.user_subjects.find_by user: @args[:user],
      subject_id: course_subject_destination.subject_id

    if user_subject_source.present? && user_subject_source.finished?
      "finished"
    else
      @args[:reject_course_subjects]
        .include?(course_subject_destination.subject_id) ? "finished" :
        course_subject_destination.status
    end
  end
end
