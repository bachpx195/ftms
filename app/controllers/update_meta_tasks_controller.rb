class UpdateMetaTasksController < ApplicationController
  before_action :find_dynamic_task, only: :update

  def update
    meta_tasks = MetaServices::UpdateMetaTasks.new(dynamic_task: @dynamic_task,
      params: params).perform
    respond_to do |format|
      format.json do
        if meta_tasks
          render json: {meta_task: meta_tasks}
        else
          render json: {message: flash_message("not_updated")
            }, status: :unprocessable_entity
        end
      end
    end
  end

  private
  def find_dynamic_task
    @dynamic_task = DynamicTask.find_by id: params[:dynamic_task_id]
    unless @dynamic_task
      respond_to do |format|
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
