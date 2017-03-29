class AssignmentsController < ApplicationController
  before_action :find_assignment, only: [:show, :find_static_task]
  before_action :find_static_task, only: :show
  before_action :find_user_team, only: :create

  def show
    respond_to do |format|
      format.html
      format.json{render json: {static_task: @static_task}}
    end
  end

  def create
    respond_to do |format|
      format.json do
        if @assignment.save
          create_tasks_for_team
          render json: {target: @assignment, message: flash_message("created")}
        else
          render json: {message: flash_message("not_created")}
        end
      end
    end
  end

  private
  def assignment_params
    params.require(:task).permit Assignment::ATTRIBUTE_PARAMS
  end

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

  def create_tasks_for_team
    params_task = params[:task]
    create_tasks_for_team = AssignmentServices::CreateTaskAssignment
      .new ownerable_id: params_task[:ownerable_id],
      assignment: @assignment, ownerable_type: params_task[:ownerable_type],
      user_team: @user_team
    create_tasks_for_team.perform
  end

  def find_user_team
    @assignment = Assignment.new assignment_params
    @user_team = CourseSubject.find_by(id: params[:task][:ownerable_id])
      .user_subjects.find_by user: current_user
    unless @user_team
      respond_to do |format|
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
