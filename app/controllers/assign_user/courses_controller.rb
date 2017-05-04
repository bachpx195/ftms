class AssignUser::CoursesController < ApplicationController
  before_action :find_course
  before_action :authorize_request

  def update
    respond_to do |format|
      format.json do
        assign_user_form = AssignUserCourseForm.new course: @course,
          user_courses: user_courses_params[:user_courses_attributes]
        if @course.in_progress?
          dynamic_task = TaskServices::AutoCreateDynamicTask.new(ownerable: @course).perform
        end

        if assign_user_form.save
          @course_supports = Supports::CourseSupport.new course: @course
          render json: {
            course: Serializers::AssignUser::CourseSerializer
              .new(object: @course, scope: {course_supports: @course_supports})
              .serializer
          }
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

  def authorize_request
    authorize_with_multiple page_params
      .merge(course: @course), AssignUser::CoursePolicy
  end

  def find_course
    @course = Course.find_by id: params[:id]
    unless @course
      respond_to do |format|
        format.html{redirect_to root_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
