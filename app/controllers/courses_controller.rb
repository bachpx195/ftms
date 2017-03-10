class CoursesController < ApplicationController
  before_action :find_course, except: [:index, :new, :create]

  def index
    @supports = Supports::CourseSupport.new
  end
  
  def new
  end

  def create
    @course = Course.new course_params.merge(creator_id: current_user.id)
    respond_to do |format|
      if @course.save
        format.html {redirect_to :back}
        format.json do
          @course[:image] = {url: @course.image.url}
          render json: {message: flash_message("created"),
            course: @course}
        end
      else
        format.html {render :new}
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @course.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def edit
    respond_to do |format|
      format.html
      format.json do
        @course[:image] = {url: @course.image.url}
        render json: {course: @course}
      end
    end
  end

  def update
    respond_to do |format|
      if @course.update_attributes course_params
        format.html
        format.json do
          @course[:image] = {url: @course.image.url}
          render json: {message: flash_message("updated"),
            course: @course}
        end
      else
        format.html {render :edit}
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
          render json: {message: flash_message("deleted")}
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
end