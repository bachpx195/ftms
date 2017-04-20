class Move::CoursesController < ApplicationController
  before_action :find_course, :find_user, only: :show

  def show
    @supports = Supports::MoveCourseSupport.new course: @course, user: @user
    respond_to do |format|
      format.json do
        if @user
          render json: {user_subjects: @supports.user_subjects}
        else
          render json: {subjects: @supports.subjects}
        end
      end
    end
  end

  private

  def find_course
    @course = Course.find_by id: params[:id]
    unless @course
      respond_to do |format|
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_user
    @user ||= User.find_by id: params[:user_id]
  end
end
