class AssignmentServices::CreateTaskAssignment
  def initialize args = {}
    @ownerable_id = args[:ownerable_id]
    @ownerable_type = args[:ownerable_type]
    @assignment = args[:assignment]
    @user_team = args[:user_team]
  end

  def perform
    assignment_static_task = StaticTask.create! targetable: @assignment,
    ownerable_id: @ownerable_id, ownerable_type: @ownerable_type
    user_team_ids = @user_team.team.user_ids
    create_dynamic_task_for_team user_team_ids, assignment_static_task
  end

  private
  def create_dynamic_task_for_team user_team_ids, assignment_static_task
    user_team_ids.map do |user_id|
      assignment_static_task.dynamic_tasks.create! ownerable_id: @ownerable_id,
        ownerable_type: @ownerable_type, user_id: user_id, status: "in_progress"
    end
  end
end
