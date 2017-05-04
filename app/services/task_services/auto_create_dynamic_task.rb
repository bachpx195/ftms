class TaskServices::AutoCreateDynamicTask
  def initialize args = {}
    @ownerable = args[:ownerable]
    @params = args[:params]
    @task_params = args[:task_params]
  end

  def perform
    if @ownerable.class.name == "Course" && @ownerable.in_progress?
      @ownerable.course_members.each do |ownerable_member|
        @ownerable.static_tasks.each do |static_task|
          dynamic_task = DynamicTask.new targetable: static_task,
            ownerable: @ownerable, objectable: ownerable_member
          if dynamic_task.save
            dynamic_task
          else
            false
          end
        end
      end
    else
      dynamic_tasks = TaskServices::AssignTask.new(params: @params,
        task_params: @task_params, ownerable: @ownerable).perform
    end
  end
end
