class CourseSubjectServices::CreateTask
  def initialize args = {}
    @targetable = args[:targetable] # assignment || surveys
    @ownerable = args[:ownerable] #course subject
  end

  def perform
    return nil if @ownerable.status == "finished"
    Task.transaction do
      begin
        static_tasks = StaticTask.create! targetable: @targetable, ownerable: @ownerable
        @ownerable.teams.each do |team|
          StaticTask.create! targetable: @targetable, ownerable: team
        end
        if @ownerable.in_progress?
          create_dynamic_task_user_subject
        end
        static_tasks
        rescue false
      end
    end
  end

  private
  def create_dynamic_task_user_subject
    @ownerable.user_subjects.where(status: "in_progress").each do |user_subject|
      DynamicTask.create! targetable: @targetable, ownerable: @ownerable,
        objectable: user_subject
    end
  end
end
