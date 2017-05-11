class CreateTask::TasksController < ApplicationController
  before_action :find_ownerable, only: :create
  before_action :authorize_request, only: :create

  def create
    @task = TaskServices::CreateTask.new(type: params[:type],
      targetable: params[:targetable], ownerable_id: params[:ownerable_id],
      ownerable_type: params[:ownerable_type],
      meta_types_checked: params[:meta_types_checked],
      current_user: current_user).perform
    unless @task
      render json: {message: flash_message("not_created")},
        status: :unprocessable_entity
    end
    target = @task.attributes.merge task_id: @task.id
    render json: {message: flash_message("created"), target: @task.targetable}
  end

  private
  def find_ownerable
    klass = params[:ownerable_type].classify
    if CLASS_NAMES.include? klass
      @ownerable = class_eval(klass).find_by id: params[:ownerable_id]
      unless @ownerable
        render json: {message: flash_message("not_found")},
          status: :not_found
      end
    else
      raise "Forbidden"
    end
  end

  def authorize_request
    authorize_with_multiple page_params.merge(ownerable: @ownerable),
      CreateTask::TaskPolicy
  end
end
