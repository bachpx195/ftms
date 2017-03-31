class Supports::TeamSupport
  def initialize args = {}
    @course_subject = args[:course_subject]
    @team = args[:team]
  end

  def subject
    @subject ||= @course_subject.subject
  end

  def course
    @course ||= @course_subject.course
  end

  def training_standard
    @training_standard ||= course.training_standard
  end

  def user_subjects
    @user_subjects ||= @team.user_subjects.map do |user_subject|
      user_subject.attributes.merge user_name: user_subject.user.name
    end
  end

  def statuses
    @statuses ||= @team.user_subjects.statuses
  end
end
