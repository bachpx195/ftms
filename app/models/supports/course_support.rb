class Supports::CourseSupport
  attr_reader :course

  def initialize args = {}
    @course = args[:course]
    @user = args[:user]
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

  def languages
    @languages ||= Language.all
  end

  def program
    @program ||= @course.program
  end

  def training_standards
    @training_standards ||= program.organization.training_standards
  end

  def evaluation_standards
    evaluation_template ||= @course.training_standard.evaluation_template
    return Array.new unless evaluation_template
    @evaluation_standards = evaluation_template.evaluation_standards
  end

  def selected_surveys
    @selected_surveys ||= @course.static_surveys.uniq
  end

  def remain_surveys
    @remain_surveys ||= Survey.all - selected_surveys
  end

  def selected_testings
    @selected_testings ||= @course.static_test_rules.uniq
  end

  def remain_testings
    @remain_testings ||= TestRule.all - selected_testings
  end

  def course_serializer
    Serializers::Courses::CourseDetailSerializer
      .new(object: @course, scope: {supports: self}).serializer
  end

  def subject_serializer
    Serializers::Courses::CourseSubjectsSerializer
      .new(object: subjects).serializer
  end

  def managed_courses_serializer
    Serializers::Courses::CourseInProgramsSerializer
      .new(object: managed_courses).serializer
  end

  private
  def subjects
    @subjects ||= @course.subjects
  end

  def managed_courses
    course_manager_ids = @user.course_managers.pluck(:course_id) - [@course.id]
    @user.courses.where program: program, id: course_manager_ids
  end
end
