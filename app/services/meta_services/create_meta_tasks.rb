class MetaServices::CreateMetaTasks
  def initialize args = {}
    @params = args[:params]
    @dynamic_task = args[:dynamic_task]
  end

  def perform
    @params[:meta_task].each do |key, params|
      meta_task = @dynamic_task.meta_tasks.create! params
        .permit(:title, :value, :dynamic_task_id)
    end
  end
end
