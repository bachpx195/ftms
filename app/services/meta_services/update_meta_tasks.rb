class MetaServices::UpdateMetaTasks
  def initialize args = {}
    @params = args[:params]
    @dynamic_task = args[:dynamic_task]
  end

  def perform
    @params[:meta_task].each do |key, params|
      meta_task = @dynamic_task.meta_tasks.find_by id: params[:id]
      meta_task.update_attributes params
        .permit :title, :value, :dynamic_task_id
    end
  end
end
