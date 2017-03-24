class SubjectsController < ApplicationController
  before_action :find_subject, except: [:index, :new, :create]
  before_action :find_course_subject, only: :show

  def index
    @subjects = Subject.select :id, :name, :image, :description, :during_time
    @subjects.map{|subject| subject[:image] = {url: subject.image.url}}
  end

  def new
  end

  def create
    @subject = Subject.new subject_params
    if @subject.save
      @subject[:image] = {url: @subject.image.url}
      render json: {message: flash_message("created"),
        subject: @subject}
    else
      render json: {message: flash_message("not_created"),
        errors: @subject.errors}, status: :unprocessable_entity
    end
  end

  def show
    params_course = params[:course_id]
    course = Course.find_by id: params_course if params_course

    @subject_supports = Supports::SubjectSupport
      .new subject: @subject, course: course, course_subject: @course_subject,
      current_user: current_user
    respond_to do |format|
      format.html
      format.json do
        render json: {
          subject_detail: Serializers::Subjects::SubjectDetailsSerializer
            .new(object: @subject, scope: {subject_supports: @subject_supports,
            course_subjects: @course_subject, courses: @course}).serializer
        }
      end
    end
  end

  def update
    respond_to do |format|
      format.json do
        if @subject.update_attributes subject_params
          @subject[:image] = {url: @subject.image.url}
          render json: {message: flash_message("updated"),
            subject: @subject}
        else
          render json: {message: flash_message("not_updated"),
            errors: @subject.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    @subject.destroy
    if @subject.deleted?
      render json: {message: flash_message("deleted")}
    else
      render json: {message: flash_message("not_deleted")},
        status: :unprocessable_entity
    end
  end

  private
  def subject_params
    params.require(:subject).permit Subject::ATTRIBUTE_PARAMS
  end

  def find_subject
    @subject = Subject.find_by id: params[:id]
    unless @subject
      render json: {message: flash_message("not_found")},
        status: :not_found
    end
  end

  def find_course_subject
    params_user_course = params[:user_course_id]
    params_course = params[:course_id]
    if params_user_course
      user_course = current_user.user_courses.find_by id: params_user_course
      if user_course
        @course_subject = CourseSubject.find_by subject_id: params[:id],
          course_id: user_course.course_id
      end
    elsif params_course
      @course_subject = CourseSubject.find_by course_id: params_course
    end
  end
end
