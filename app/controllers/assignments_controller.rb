class AssignmentsController < ApplicationController
  before_action :find_assignment, only: [:show, :find_static_task]
  before_action :find_static_task, only: :show
  before_action :find_user_team, only: :create
  before_action :authorize_request

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
          create_meta_types @assignment
          static_task, dynamic_task = create_tasks_for_team
          render json: {target:
            {
              assignment: Serializers::Subjects::AssignmentsSerializer
                .new(object: @assignment).serializer,
              static_task: static_task,
              dynamic_task: dynamic_task
            }, message: flash_message("created")}
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
    static_task = create_static_task_assignment
    params_task = params[:task]
    create_tasks_for_team = AssignmentServices::CreateTaskAssignment
      .new static_task: static_task, ownerable_id: params_task[:ownerable_id],
      user_team: @user_team, current_user: current_user,
      ownerable_type: params_task[:ownerable_type]
    dynamic_tasks = create_tasks_for_team.perform
    [static_task, find_dynamic_task(dynamic_tasks)]
  end

  def find_dynamic_task dynamic_tasks
    dynamic_tasks.find do |dynamic_task|
      dynamic_task.user_id == current_user.id
    end
  end

  def create_static_task_assignment
    params_task = params[:task]
    static_task = AssignmentServices::CreateStaticTaskAssignment
      .new ownerable_id: params_task[:ownerable_id], assignment: @assignment,
      ownerable_type: params_task[:ownerable_type]
    static_task.perform
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

  def create_meta_types assignment
    params[:meta_types_checked].pluck(:id).each do |meta_type_id|
      meta_type = MetaType.find_by id: meta_type_id
      assignment.meta_types << meta_type
    end
  end

  def authorize_request
    authorize_with_multiple page_params.merge(assignment: @assignment,
      team: @user_team.team), AssignmentPolicy
  end
end
