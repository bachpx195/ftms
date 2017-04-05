class Serializers::SupportSerializer < Serializers::BaseSerializer
  def object
    @object ||= nil
  end

  def user_id
    @user_id ||= nil
  end

  def supports
    @supports ||= nil
  end

  def owner
    @owner ||= nil
  end

  def course_subject
    @course_subject ||= nil
  end

  def course
    @course ||= nil
  end

  def courses
    @courses ||= nil
  end

  def subject_supports
    @subject_supports ||= nil
  end

  def course_subjects
    @course_subjects ||= nil
  end

  def show_program
    @show_program ||= nil
  end

  def task_id
    task =
      if user_id
        object.dynamic_tasks.find_by ownerable: course_subject,
          user_id: user_id
      else
        return nil unless owner
        owner.static_tasks.find_by targetable_id: object.id
      end
    task.id if task
  end
end
