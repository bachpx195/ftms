class Supports::SubjectSupport
  attr_accessor :course

  def initialize args = {}
    @subject = args[:subject]
    @course = args[:course]
    @course_subject = args[:course_subject]
    @current_user = args[:current_user]
  end

  def organization
    if @course
      @course.program.organization
    else
      @subject.organization
    end
  end

  %w(surveys assignments test_rules).each do |task|
    define_method "#{task}_not_in_static_task" do
      if @course.present?
        organization.send(task).where.not id: @course_subject.send("static_#{task}")
      else
        organization.send(task).where.not id: @subject.send(task)
      end
    end
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
    assignments = @current_user.user_assigmnent
    Serializers::Subjects::AssignmentsSerializer
      .new(object: assignments).serializer
  end

  def user_dynamic_tasks
    @user_dynamic_tasks = @current_user.user_dynamic_tasks
    Serializers::Tasks::DynamicTasksSerializer
      .new(object: @user_dynamic_tasks).serializer
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

  def member_ids
    if @course
      @course.members.map(&:id).uniq
    end
  end

  def subject_detail
    Serializers::Subjects::SubjectDetailsSerializer
      .new(object: @subject,
      scope: {subject_supports: self, course_subjects: @course_subject,
      course: @course, current_user: @current_user}).serializer
  end

  def member_evaluations
    member_evaluations = @course_subject ? @course_subject
      .member_evaluations : Array.new
    Serializers::Evaluations::MemberEvaluationsSerializer
      .new(object: member_evaluations).serializer
  end

  def organizations
    @organizations ||= Organization.all
  end

  def static_test_rules
    return Array.new unless course_subject
    @static_test_rules ||= course_subject.static_test_rules
  end

  def meta_types
    organization.meta_types
  end

  def is_manager_course?
    @course.managers.include? @current_user if @course
    @course_subject.course.managers.include? @current_user if @course_subject

  end

  def is_member_course?
    @course.members.include? @current_user if @course
    @course_subject.course.members.include? @current_user if @course_subject
  end
end
