class Supports::SubjectSupport
  def initialize args = {}
    @subject = args[:subject]
    @course = args[:course]
    @course_subject = args[:course_subject]
  end

  def user_subjects
    return Array.new unless course_subject
    @user_subjects ||= course_subject.user_subjects
  end

  def course_subject
    return nil unless @course
    @course_subject ||= @course.course_subjects.find_by subject_id: @subject.id
  end

  def surveys_not_in_static_task
    @surveys ||= @subject.organization.surveys.where.not id: @subject.surveys
  end

  def assignments_not_in_static_task
    @assignments ||= @subject.organization.assignments.where
      .not id: @subject.assignments
  end

  def test_rules_not_in_static_task
    @test_rules ||= @subject.organization.test_rules.where
      .not id: @subject.test_rules
  end

  def projects_not_in_static_task
    @projects ||= @subject.organization.projects.where
      .not id: @course_subject.dynamic_tasks
  end
end
