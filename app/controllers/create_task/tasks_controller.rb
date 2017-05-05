class CreateTask::TasksController < ApplicationController
  before_action :find_ownerable, only: :create
  before_action :authorize_request, only: :create

  def create
    @target = class_eval(params[:task][:type].classify).new task_params
    @target.creator_id = current_user.id
    if @target.save
      static_task = TaskServices::CreateTask.new(targetable: @target,
        ownerable: @ownerable, meta_types_checked: params[:meta_types_checked]).perform
      unless static_task.save
        render json: {message: flash_message("not_created")},
          status: :unprocessable_entity
      end
    end
    target = @target.attributes.merge task_id: static_task.id
    render json: {message: flash_message("created"), target: target}
  end

  private
  def task_params
    params.require(:task).permit :name, :content
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

  def authorize_request
    authorize_with_multiple page_params.merge(ownerable: @ownerable),
      CreateTask::TaskPolicy
  end
end
