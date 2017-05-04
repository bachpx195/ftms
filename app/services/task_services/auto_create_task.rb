class TaskServices::AutoCreateTask
  def initialize args = {}
    @course = args[:course]
  end

  def perform
    @course.subjects.each do |subject|
      ownerable = CourseSubject.find_by course: @course, subject: subject
      subject.static_tasks.each do |targetable|
        static_task = StaticTask.new targetable: targetable, ownerable: ownerable
        if static_task.save
          static_task
        else
          false
        end
      end
    end
  end
end
