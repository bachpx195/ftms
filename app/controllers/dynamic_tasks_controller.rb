class DynamicTasksController < ApplicationController
  before_action :find_dynamic_task, only: :update

  def update
    respond_to do |format|
      format.html{@dynamic_task.update_attributes dynamic_params}
      format.json do
        if @dynamic_task.update_attributes dynamic_params
          render json: {dynamic_task: @dynamic_task}
        else
          render json: {message: flash_message("not_updated"),
            errors: @dynamic_task.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  private
  def dynamic_params
    params.require(:dynamic_task).permit :status
  end

  def find_dynamic_task
    @dynamic_task = DynamicTask.find_by id: params[:id]
    unless @dynamic_task
      respond_to do |format|
        format.html
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
