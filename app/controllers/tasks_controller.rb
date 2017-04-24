class TasksController < ApplicationController
  before_action :load_supports
  before_action :find_task

  def show
  end

  private
  def load_supports
    @task_supports = Supports::TaskSupport.new params: params
  end

  def find_task
    unless @task_supports.task
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
