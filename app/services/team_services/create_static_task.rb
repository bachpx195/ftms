class TeamServices::CreateStaticTask
  def initialize args = {}
    @team = args[:team]
    @course_subject = args[:course_subject]
  end

  def perform
    begin
      Task.transaction do
        @course_subject.static_tasks.each do |static_task|
          StaticTask.create! targetable: static_task, ownerable: @team
        end
      end
    rescue false
    end
  end
end
