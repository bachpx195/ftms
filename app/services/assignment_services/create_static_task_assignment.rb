class AssignmentServices::CreateStaticTaskAssignment
  def initialize args = {}
    @ownerable_id = args[:ownerable_id]
    @ownerable_type = args[:ownerable_type]
    @assignment = args[:assignment]
  end

  def perform
    StaticTask.create! targetable: @assignment,
      ownerable_id: @ownerable_id, ownerable_type: @ownerable_type
  end
end
