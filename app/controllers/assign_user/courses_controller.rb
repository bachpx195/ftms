class AssignUser::CoursesController < ApplicationController
  before_action :find_course

  def update
    respond_to do |format|
      format.json do
        if @course.update_attributes user_courses_params
          @supports = Supports::CourseSupport.new course: @course
        else
          render json: {message: flash_message("not_updated")},
            status: :unprocessable_entity
        end
      end
    end
  end

  private
  def user_courses_params
    params.require(:course).permit Course::USER_COURSE_ATTRIBUTES_PARAMS
  end

  def find_course
    @course = Course.find_by id: params[:id]
    unless @course
      respond_to do |format|
        format.html {redirect_to root_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
