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
    @course_subjects ||= @course.training_standard.subjects
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
end
