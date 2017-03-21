class MetaTasksController < ApplicationController
  before_action :authorize_class
  before_action :find_dynamic_task, only: [:index, :create]

  def index
    @meta_tasks = @dynamic_task.meta_tasks
    respond_to do |format|
      format.json {render json: {meta_tasks: @meta_tasks}}
    end
  end

  def create
    @meta_task = @dynamic_task.meta_tasks.build meta_task_params
    respond_to do |format|
      format.json do
        if @meta_task.save
          render json: {meta_task: @meta_task}
        else
          render json: {message: flash_message("not_created"),
            errors: @meta_task.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def show
  end

  def update
    respond_to do |format|
      format.json do
        if @meta_task.update_attributes meta_task_params
          render json: {meta_task: @meta_task}
        else
          render json: {message: flash_message("not_created"),
            errors: @meta_task.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  private
  def meta_task_params
    params.require(:meta_task).permit :title, :value, :dynamic_task_id, :meta_type
  end

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
