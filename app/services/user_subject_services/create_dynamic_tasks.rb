class UserSubjectServices::CreateDynamicTasks
  def initialize args = {}
    @user_subject = args[:user_subject]
    @status = args[:status]
  end

  def perform
    begin
      DynamicTask.transaction do
        create_dynamic_tasks if @user_subject.init? && @status != "init"
      end
      true
    rescue false
    end
  end

  private

  def create_dynamic_tasks
    course_subject = @user_subject.course_subject
    user = @user_subject.user
    static_tasks = course_subject.static_tasks
    static_tasks.each do |static_task|
      DynamicTask.create! targetable: static_task,
        ownerable: course_subject, status: "init", objectable: user
    end
  end
end
