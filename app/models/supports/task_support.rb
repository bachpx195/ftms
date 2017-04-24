class Supports::TaskSupport
  def initialize args = {}
    @params = args[:params]
  end

  def task
    @task ||= Task.find_by id: @params[:id]
  end

  def task_serializer
    Serializers::Tasks::StaticTaskSerializer.new(object: task).serializer
  end
end
