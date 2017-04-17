class Supports::TimelineSupport
  def initialize args = {}
    @user = args[:user]
  end

  def assignments
    assignments = Array.new
    @user.user_subjects.each do |user_subject|
      assignments += user_subject.assignments
    end
    assignments
  end

  def user_subjects
    @user_subjects ||= @user.user_subjects
  end

  def dynamic_tasks assignment, course_subject, user
    static_task = assignment.static_tasks.find_by ownerable_type: course_subject.class.name,
      ownerable_id: course_subject.id
    @dynamic_tasks = user.dynamic_tasks.where ownerable_type: course_subject.class.name
    @dynamic_tasks.find_by targetable_id: static_task.id
  end

  def count_assignment status
    @dynamic_tasks.where(status: status).length
  end
end
