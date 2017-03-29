class Supports::SubjectSupport
  def initialize args = {}
    @subject = args[:subject]
    @course = args[:course]
    @course_subject = args[:course_subject]
    @current_user = args[:current_user]
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

  def user_assigmnent
    user_static_course_subjects = user_dynamic_course_subjects
      .user_static_tasks

    user_static_assignments = user_static_course_subjects
      .where targetable_type: Assignment.name

    @user_assignment = user_static_assignments
      .includes(:targetable).map(&:targetable)
  end
end
