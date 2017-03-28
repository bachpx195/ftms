class AssignmentsController < ApplicationController
  before_action :find_assignment, only: [:show, :find_static_task]
  before_action :find_static_task, only: :show
  before_action :authorize_class, only: :show

  def show
    respond_to do |format|
      format.html
      format.json{render json: {static_task: @static_task}}
    end
  end

  private
  def find_assignment
    @assignment = Assignment.find_by id: params[:id]
    unless @assignment
      respond_to do |format|
        format.html
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_static_task
    @static_task = StaticTask.find_by targetable_id: @assignment,
      targetable_type: "Assignment"
    unless @static_task
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
