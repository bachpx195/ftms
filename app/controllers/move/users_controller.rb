class Move::UsersController < ApplicationController
  before_action :load_supports
  before_action :find_user, :find_source, :find_destination, only: :create

  def create
    respond_to do |format|
      format.json do
        moving_history = handle_service.perform
        if moving_history
          render json: {message: flash_message("created"),
            moving_history: moving_history,
            user_detail: @move_user_supports.user_serializer}
        else
          render json: {message: flash_message("not_created")},
            status: :unprocessable_entity
        end
      end
    end
  end

  private
  def moving_history_params
    params.require(:moving_history).permit MovingHistory::ATTRIBUTE_PARAMS
  end

  def load_supports
    @move_user_supports = Supports::MoveUserSupport
      .new params: moving_history_params
  end

  def find_user
    not_found unless @move_user_supports.user
  end

  def find_source
    not_found unless @move_user_supports.source
  end

  def find_destination
    not_found unless @move_user_supports.destination
  end

  def handle_service
    user = @move_user_supports.user
    source = @move_user_supports.source
    destination = @move_user_supports.destination
    if moving_history_params[:sourceable_type] == "Course"
      MovingHistoryServices::MovingCourse.new user: user,
        source: source, destination: destination,
        reject_course_subjects: params[:reject_course_subjects],
        params: moving_history_params
    else
      MovingHistoryServices::MovingProgram.new user: user,
        source: source, destination: destination,
        params: moving_history_params
    end
  end

  def not_found
    respond_to do |format|
      format.json do
        render json: {message: flash_message("not_found")},
          status: :not_found
      end
    end
  end
end
