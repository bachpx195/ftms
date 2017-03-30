class CreateTask::TasksController < ApplicationController
  include Authorize

  before_action :find_ownerable, only: :create
  before_action :namespace_authorize, only: :create

  def create
    respond_to do |format|
      @target = class_eval(params[:task][:type].classify).new task_params
      if @target.save
        @task = StaticTask.new targetable: @target, ownerable: @owner
        unless @task.save
          format.html
          format.json do
            render json: {message: flash_message("not_created")},
              status: :unprocessable_entity
          end
        end
      end
      target = @target.attributes.merge task_id: @task.id
      format.html
      format.json do
        render json: {message: flash_message("created"), target: target}
      end
    end
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
        respond_to do |format|
          format.html {redirect_to :back}
          format.json do
            render json: {message: flash_message("not_found")},
              status: :not_found
          end
        end
      end
    else
      raise "Forbidden"
    end
  end
end
