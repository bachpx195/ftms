class AssignmentServices::UpdateTaskAssignment
  def initialize args = {}
    @dynamic_task = args[:dynamic_task]
    @team_dynamic_tasks = args[:team_dynamic_tasks]
    @dynamic_params = args[:dynamic_params]
    @team_status = args[:team_status]
  end

  def perform
    DynamicTask.transaction do
      begin
        raise if @team_dynamic_tasks.find_by @dynamic_params
        if @dynamic_task.update_attributes!(@dynamic_params) &&
          @team_dynamic_tasks
          update_task_for_team @team_dynamic_tasks
        end
        true
      rescue
        false
      end
    end
  end

  private
  def update_task_for_team team_dynamic_tasks
    team_dynamic_tasks.each do |task|
      task.update_attributes! status: @team_status
    end
  end
end
