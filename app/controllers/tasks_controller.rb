class TasksController < ApplicationController
  def create
    respond_to do |format|
      params[:task][:targetable_ids].each do |targetable_id|
        _params = task_params
        _params[:targetable_type] = task_params[:targetable_type].classify
        @task = StaticTask.new _params
        @task.targetable_id = targetable_id
        unless @task.save
          format.html {}
          format.json {render json: {message: "error"}}
        end
      end
      format.html {}
      format.json {render json: {message: "success"}}
    end
  end

  private
  def task_params
    params.require(:task).permit :targetable_id, :targetable_type,
      :ownerable_id, :ownerable_type, :user_id
  end
end
