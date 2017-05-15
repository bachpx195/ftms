class CoursesController < ApplicationController
  before_action :find_program, only: :create
  before_action :find_course, only: [:update, :destroy, :show]
  before_action :authorize_request

  def index
    courses = Course.includes :owner, :creator, :members,
      :managers, program: [:organization], training_standard: :subjects
    @course_serializer = Serializers::Courses::CoursesSerializer
      .new(object: courses).serializer
  end

  def create
    training_standard = TrainingStandard
      .find_by id: course_params[:training_standard_id]
    subject_ids =
      if training_standard
        training_standard.subject_ids
      else
        Array.new
      end
    @course = @program.courses.build course_params
      .merge creator_id: current_user.id, subject_ids: subject_ids

    respond_to do |format|
      if @course.save
        static_task = TaskServices::AutoCreateTask.new(course: @course).perform
        CourseServices::InitializeUserSubject.new(course: @course,
          user_courses: course_params[:user_courses_attributes]).perform
        format.html{redirect_to :back}
        format.json do
          @course[:image] = {url: @course.image.url}
          render json: {message: flash_message("created"),
            course: Serializers::Programs::CoursesSerializer
              .new(object: @course).serializer}
        end
      else
        format.html{render :new}
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @course.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def show
    @course_supports = Supports::CourseSupport.new course: @course,
      user: current_user
  end

  def update
    respond_to do |format|
      if @course.update_attributes update_course_params
        if @course.in_progress?
          dynamic_task = TaskServices::AutoCreateDynamicTask.new(ownerable: @course).perform
        end
        format.html
        format.json do
          @course[:image] = {url: @course.image.url}
          render json: {message: flash_message("updated"),
            course: @course}
        end
        update_user_course_service =
          CourseServices::UpdateUserCourse.new @course
        update_user_course_service.perform
      else
        format.html
        format.json do
          render json: {message: flash_message("not_updated"),
            errors: @course.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    @course.destroy
    respond_to do |format|
      format.html
      format.json do
        if @course.deleted?
          render json: {message: flash_message("deleted"),
            program: @course.program}
        else
          render json: {message: flash_message("not_deleted")},
            status: :unprocessable_entity
        end
      end
    end
  end

  private
  def course_params
    params.require(:course).permit Course::ATTRIBUTE_PARAMS
  end

  def update_course_params
    params.require(:course).permit Course::UPDATE_PARAMS
  end

  def find_program
    @program = Program.find_by id: params[:program_id]
    unless @program
      respond_to do |format|
        format.html {redirect_to programs_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_course
    @course = Course.find_by id: params[:id]
    unless @course
      respond_to do |format|
        format.html {redirect_to courses_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def authorize_request
    authorize_with_multiple page_params.merge(course: @course,
      program: @program, courses: current_user.courses), CoursePolicy
  end
end
