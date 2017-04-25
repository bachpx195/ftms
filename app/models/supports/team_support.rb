class Supports::TeamSupport
  def initialize args = {}
    @params = args[:params]
  end

  def course_subject
    @course_subject ||= @team.course_subject
  end

  def team
    @team ||= Team.find_by id: @params[:id]
  end

  def subject
    @subject ||= course_subject.subject
  end

  def course
    @course ||= course_subject.course
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
    @user_subjects ||= team.user_subjects.map do |user_subject|
      user_subject.attributes.merge user_name: user_subject.user.name
    end
  end

  def statuses
    @statuses ||= UserSubject.statuses
  end

  def member_evaluations
    return Array.new unless course_subject
    @member_evaluations ||=
      Serializers::Evaluations::MemberEvaluationsSerializer
        .new(object: course_subject.member_evaluations).serializer
  end

  def team_detail
    @team_detail ||= Serializers::Teams::TeamDetailsSerializer
      .new(object: team, scope: {course_subjects: course_subject,
        team_supports: self}).serializer
  end

  def surveys_not_in_static_task
    @surveys ||= team.course_subject.subject.organization.surveys
      .where.not id: team.surveys
  end

  def assignments_not_in_static_task
    @assignments ||= team.course_subject.subject.organization.assignments.where
      .not id: team.assignments
  end

  def test_rules_not_in_static_task
    @test_rules ||= team.course_subject.subject.organization.test_rules.where
      .not id: team.test_rules
  end

  def projects_not_in_static_task
    @test_rules ||= team.course_subject.subject.organization.projects.where
      .not id: team.test_rules
  end

  def documents
    @documents ||= team.documents
  end

  def organizations
    @organizations ||= Organization.all
  end
end
