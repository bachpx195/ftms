class SubjectServices::CreateTask
  def initialize args = {}
    @targetable = args[:targetable] # assignment || surveys
    @ownerable = args[:ownerable] #subject
  end

  def perform
    Task.transaction do
      begin
        static_tasks = StaticTask.create! targetable: @targetable, ownerable: @ownerable
        @ownerable.course_subjects.each do |course_subject|
          StaticTask.create! targetable: @targetable, ownerable: course_subject
        end
        static_tasks

        rescue false
      end
    end
  end
end
