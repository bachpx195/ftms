class TaskServices::AssignTask
  def initialize args = {}
    @params = args[:params]
    @task_params = args[:task_params]
    @ownerable = args[:ownerable]
  end

  def perform
    list_targets = Array.new
    @task_params[:targetable_type] = @task_params[:targetable_type].classify
    @params[:task][:targetable_ids].each do |targetable_id|
      task = @ownerable
        .send(@params[:task][:user_id] ? "dynamic_tasks" : "static_tasks")
        .new @task_params
      task.targetable_id = targetable_id
      return false unless task.save
      if @task_params[:targetable_type] == "StaticTask"
        list_targets << task.targetable.targetable.attributes
          .merge(task_id: task.id)
      else
        list_targets << task.targetable.attributes.merge(task_id: task.id)
      end
    end
    list_targets
  end
end
