class Supports::SubjectSupport
  def initialize args = {}
    @subject = args[:subject]
  end

  def user_subjects
    UserSubject.all
  end

  def surveys_not_in_static_task
    @surveys ||= @subject.organization.surveys.where.not id: @subject.surveys
  end

  def assignments_not_in_static_task
    @assignments ||= @subject.organization.assignments.where.not id: @subject.assignments
  end

  def test_rules_not_in_static_task
    @test_rules ||= @subject.organization.test_rules.where.not id: @subject.test_rules
  end
end
