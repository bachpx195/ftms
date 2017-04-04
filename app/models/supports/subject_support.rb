class Supports::SubjectSupport
  attr_accessor :course

  def initialize args = {}
    @subject = args[:subject]
    @course = args[:course]
    @course_subject = args[:course_subject]
    @current_user = args[:current_user]
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

  def user_subjects
    return Array.new unless course_subject
    @user_subjects ||= course_subject.user_subjects
  end

  def course_subject
    return nil unless @course
    @course_subject ||= @course.course_subjects.find_by subject_id: @subject.id
  end

  def user_dynamic_course_subjects
    @current_user.dynamic_tasks.owner_tasks @course_subject
  end

  def user_static_task
    user_static_course_subjects = user_dynamic_course_subjects
      .user_static_tasks

    user_static_course_subjects
      .where targetable_type: Assignment.name
  end

  def user_assigmnent
    @user_assignment = user_static_task
      .includes(:targetable).map(&:targetable)
  end

  def training_standard
    return nil unless @course
    @training_standard ||= @course.training_standard
  end

  def evaluation_template
    return nil unless training_standard
    @evaluation_template ||= training_standard.evaluation_template
  end

  def evaluation_standards
    return Array.new unless evaluation_template
    @evaluation_standards ||= evaluation_template.evaluation_standards
  end

end
