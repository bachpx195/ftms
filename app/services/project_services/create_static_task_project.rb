class ProjectServices::CreateStaticTaskProject
  def initialize args = {}
    @ownerable_id = args[:ownerable_id]
    @ownerable_type = args[:ownerable_type]
    @project = args[:project]
  end

  def perform
    StaticTask.create! targetable: @project,
      ownerable_id: @ownerable_id, ownerable_type: @ownerable_type
  end
end
