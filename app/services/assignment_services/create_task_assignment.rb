class AssignmentServices::CreateTaskAssignment
  def initialize args = {}
    @static_task = args[:static_task]
    @user_team = args[:user_team]
    @ownerable_id = args[:ownerable_id]
    @ownerable_type = args[:ownerable_type]
  end

  def perform
    user_team_ids = @user_team.team.user_ids
    create_dynamic_task_for_team user_team_ids, @static_task
  end

  private
  def create_dynamic_task_for_team user_team_ids, assignment_static_task
    user_team_ids.map do |user_id|
      DynamicTask.create! targetable_id: assignment_static_task.id,
        targetable_type: "Task", ownerable_id: @ownerable_id,
        ownerable_type: @ownerable_type, objectable_id: user_id,
        objectable_type: "User", status: "init"
    end
  end
end
