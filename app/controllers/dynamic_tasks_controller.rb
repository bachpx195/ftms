class DynamicTasksController < ApplicationController
  before_action :find_dynamic_task, :find_course_subject,
    :load_team_user_ids, :load_team_dynamic_tasks, only: :update
  before_action :authorize_request

  def update
    respond_to do |format|
      format.json do
        update_task_assignment_service =
          AssignmentServices::UpdateTaskAssignment
            .new dynamic_task: @dynamic_task,
            team_dynamic_tasks: @team_dynamic_tasks,
            dynamic_params: dynamic_params,
            team_status: params[:dynamic_task][:team_status]

        if update_task_assignment_service.perform
          render json: {dynamic_task: @dynamic_task,
            team_dynamic_tasks: @team_dynamic_tasks}
        else
          render json: {message: flash_message("not_updated"),
            errors: @dynamic_task.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  private
  def dynamic_params
    params.require(:dynamic_task).permit :status
  end

  def find_dynamic_task
    @dynamic_task = DynamicTask.find_by id: params[:id]
    unless @dynamic_task
      respond_to do |format|
        format.html
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_course_subject
    if course_subject_id = params[:course_subject][:id]
      @course_subject = CourseSubject.find_by id: course_subject_id
    end
    unless @course_subject
      respond_to do |format|
        format.html{}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def load_team_user_ids
    @team_user_ids = @course_subject.user_subjects
      .find_by(user: current_user).team.users.ids
    @team_user_ids.delete current_user.id
  end

  def load_team_dynamic_tasks
    @team_dynamic_tasks = DynamicTask.owner_tasks(@course_subject)
      .target_tasks(@dynamic_task.targetable).team_tasks @team_user_ids

    unless @team_dynamic_tasks
      respond_to do |format|
        format.html
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def authorize_request
    authorize_with_multiple page_params.merge(dynamic_task: @dynamic_task,
      team_mem: @team_user_ids.push(current_user.id), course_subject: @course_subject), DynamicTaskPolicy
  end
end
