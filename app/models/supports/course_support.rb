class Supports::CourseSupport
  attr_reader :course

  def initialize args = {}
    @course = args[:course]
    @program = args[:program]
  end

  def managers
    @managers ||= @course.managers.uniq
  end

  def members
    @members ||= @course.members.uniq
  end

  def unassigned_users
    @unassigned_users ||= (program.users - managers - members).uniq
  end

  def course_subjects
    @course_subjects ||= @course.subjects
  end

  def languages
    @languages ||= Language.all
  end

  def program
    @program ||= @course.program
  end

  def training_standards
    @training_standards ||= program.training_standards
  end

  def evaluation_standards
    @evaluation_standards ||= @course
      .training_standard.evaluation_template.evaluation_standards
  end

  def selected_surveys
    @selected_surveys ||= @course.static_surveys.uniq
  end

  def remain_surveys
    @remain_surveys ||= Survey.where.not id: selected_surveys
  end

  def selected_testings
    @selected_testings ||= @course.static_test_rules.uniq
  end

  def remain_testings
    @remain_testings ||= TestRule.where.not id: selected_testings
  end
end
