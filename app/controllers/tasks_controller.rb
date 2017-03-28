class TasksController < ApplicationController
  before_action :find_task, only: :destroy

  def create
    list_tasks = Array.new
    respond_to do |format|
      params[:task][:targetable_ids].each do |targetable_id|
        _params = task_params
        _params[:targetable_type] = task_params[:targetable_type].classify
        @task = StaticTask.new _params
        @task.targetable_id = targetable_id
        unless @task.save
          format.html
          format.json do
            render json: {message: flash_message("not_created")},
              status: :unprocessable_entity
          end
        end
        list_tasks << @task.targetable.attributes.merge(task_id: @task.id)
      end
      format.html
      format.json do
        render json: {message: flash_message("created"), list_tasks: list_tasks}
      end
    end
  end

  def destroy
    @task.destroy
    respond_to do |format|
      format.html{redirect_to :back}
      format.json do
        if @task.deleted?
          render json: {message: flash_message("deleted")}
        else
          render json: {message: flash_message("not_deleted")},
            status: :unprocessable_entity
        end
      end
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
      respond_to do |format|
        format.html{redirect_to subjects_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
