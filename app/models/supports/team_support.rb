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

  def evaluation_template
    return nil unless training_standard
    @evaluation_template ||= training_standard.evaluation_template
  end

  def evaluation_standards
    return Array.new unless evaluation_template
    @evaluation_standards ||= evaluation_template.evaluation_standards
  end

  def user_subjects
    @user_subjects ||= @team.user_subjects.map do |user_subject|
      user_subject.attributes.merge user_name: user_subject.user.name
    end
  end

  def statuses
    @statuses ||= @team.user_subjects.statuses
  end

  def member_evaluations
    return Array.new unless @course_subject
    @member_evaluations ||=
      Serializers::Evaluations::MemberEvaluationsSerializer
        .new(object: @course_subject.member_evaluations).serializer
  end

  def documents
    @documents ||= @team.documents
  end
end
