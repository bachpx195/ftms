class MetaTasksController < ApplicationController
  before_action :authorize_class
  before_action :find_dynamic_task, only: [:index, :create]

  def index
    @meta_tasks = @dynamic_task.meta_tasks
    respond_to do |format|
      format.json{render json: {meta_tasks: @meta_tasks}}
    end
  end

  def create
    meta_tasks = MetaServices::CreateMetaTasks.new(dynamic_task: @dynamic_task,
      params: params).perform
    respond_to do |format|
      format.json do
        if meta_tasks
          render json: {meta_tasks: meta_tasks}
        else
          render json: {message: flash_message("not_created")},
            status: :unprocessable_entity
        end
      end
    end
  end

  def show
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
