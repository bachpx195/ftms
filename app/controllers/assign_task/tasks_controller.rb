class AssignTask::TasksController < ApplicationController
  include Authorize

  before_action :find_task, only: :destroy
  before_action :find_ownerable, only: :create
  before_action :namespace_authorize, only: [:create, :destroy]

  def create
    list_targets = TaskServices::AssignTask.new(params: params,
      task_params: task_params, ownerable: @ownerable).perform
    if list_targets
      render json: {message: flash_message("created"),
        list_targets: list_targets}
    else
      render json: {message: flash_message("not_created")},
        status: :unprocessable_entity
    end
  end

  def destroy
    if @task.destroy
      render json: {message: flash_message("deleted")}
    else
      render json: {message: flash_message("not_deleted")},
        status: :unprocessable_entity
    end
  end

  private
  def task_params
    params.require(:task).permit :targetable_id, :targetable_type,
      :ownerable_id, :ownerable_type, :user_id
  end

  def find_task
    @task = Task.find_by id: params[:id]
    unless @task
      render json: {message: flash_message("not_found")},
        status: :not_found
    end
  end

  def find_ownerable
    klass = params[:task][:ownerable_type].classify

    if CLASS_NAMES.include? klass
      @ownerable = class_eval(klass).find_by id: params[:task][:ownerable_id]
      unless @ownerable
        render json: {message: flash_message("not_found")},
          status: :not_found
      end
    else
      raise "Forbidden"
    end
  end
end
