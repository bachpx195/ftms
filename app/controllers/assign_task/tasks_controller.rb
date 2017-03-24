class AssignTask::TasksController < ApplicationController
  before_action :find_task, only: :destroy
  before_action :find_ownerable, only: :create
  before_action :namespace_authorize, only: :create

  def create
    list_targets = [];
    respond_to do |format|
      params[:task][:targetable_ids].each do |targetable_id|
        _params = task_params
        _params[:targetable_type] = task_params[:targetable_type].classify
        @task = if params[:task][:user_id]
          @ownerable.dynamic_tasks.new _params
        else
          @ownerable.static_tasks.new _params
        end
        @task.targetable_id = targetable_id
        unless @task.save
          format.html {}
          format.json {render json: {message: flash_message("not_created")},
            status: :unprocessable_entity}
        end
        if _params[:targetable_type] == "StaticTask"
          list_targets << @task.targetable.targetable.attributes.merge(task_id: @task.id)
        else
          list_targets << @task.targetable.attributes.merge(task_id: @task.id)
        end
      end
      format.html {}
      format.json {render json: {message: flash_message("created"),
        list_targets: list_targets}}
    end
  end

  def destroy
    @task.destroy
    respond_to do |format|
      format.html {redirect_to :back}
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
    @task = if(params[:targetable_type] == "Survey")
      StaticTask.find_by targetable_id: params[:id], targetable_type: "Survey"
    else
      StaticTask.find_by targetable_id: params[:id], targetable_type: "TestRule"
    end
    unless @task
      respond_to do |format|
        format.html {redirect_to subjects_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_ownerable
    @ownerable = class_eval(params[:task][:ownerable_type].classify)
      .find_by id: params[:task][:ownerable_id]
    unless @ownerable
      respond_to do |format|
        format.html {redirect_to :back}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
