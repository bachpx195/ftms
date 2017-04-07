class Move::UsersController < ApplicationController
  before_action :find_user, :find_source, :find_destination, only: :create

  def create
    respond_to do |format|
      format.json do
        @moving_history = handle_service
        if @moving_history
          render json: {message: flash_message("created"),
            moving_history: @moving_history} if @moving_history
        else
          render json: {message: flash_message("not_created"),
            status: :unprocessable_entity
        end
      end
    end
  end

  private
  def moving_history_params
    params.require(:moving_history).permit MovingHistory::ATTRIBUTE_PARAMS
  end

  def find_user
    @user = User.find_by id: params[:user_id]
    unless @user
      respond_to do |format|
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_source
    source_type = params[:sourceable_type]
    if source_type
      @source = source_type.classify.constantize.find_by id:
        params[:sourceable_id]
    end
    unless @source
      respond_to do |format|
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_destination
    destination_type = params[:destinationable_type]
    if destination_type
      @destination = destination_type.classify.constantize.find_by id:
        params[:destinationable_id]
    end
    unless @destination
      respond_to do |format|
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def handle_service
    service = if params[:sourceable_type] == "Course"
      MovingHistoryServices::MovingCourse.new user: @user,
        source: @source, destination: @destination,
        reject_course_subjects: params[:reject_course_subjects],
        params: moving_history_params
    else
      MovingHistoryServices::MovingProgram.new user: @user,
        source: @source, destination: @destination,
        params: moving_history_params
    end
    service.perform
  end
end
