class SubjectsController < ApplicationController
  before_action :find_subject, :find_course, except: [:index, :new, :create]
  before_action :find_course_subject, only: :show

  def index
    @subjects = Subject.select :id, :name, :image, :description
    @subjects.map{|subject| subject[:image] = {url: subject.image.url}}
  end

  def new
  end

  def create
    @subject = Subject.new subject_params
    respond_to do |format|
      if @subject.save
        format.html {redirect_to @subject}
        format.json do
          @subject[:image] = {url: @subject.image.url}
          render json: {message: flash_message("created"),
            subject: @subject}
        end
      else
        format.html {render :new}
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @subject.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def show
    #admin
    @course_subject = CourseSubject.find_by params[:course_id]
    @subject_supports = Supports::SubjectSupport
      .new subject: @subject, course: @course, course_subject: @course_subject

    #trainee
    @user_subjects = current_user.user_subjects

    user_dynamic_course_subjects = current_user.dynamic_tasks.
      owner_tasks @course_subject
    user_static_course_subjects = user_dynamic_course_subjects.user_static_tasks
    @user_static_assignments = user_static_course_subjects.
      where targetable_type: Assignment.name
    @user_assignment = @user_static_assignments.includes(:targetable).map{|user_static_assignment|
      user_static_assignment.targetable}
  end

  def edit
    respond_to do |format|
      format.html
      format.json do
        @subject[:image] = {url: @subject.image.url}
        render json: {subject: @subject}
      end
    end
  end

  def update
    respond_to do |format|
      if @subject.update_attributes subject_params
        format.html {redirect_to @subject}
        format.json do
          @subject[:image] = {url: @subject.image.url}
          render json: {message: flash_message("updated"),
            subject: @subject}
        end
      else
        format.html {render :edit}
        format.json do
          render json: {message: flash_message("not_updated"),
            errors: @subject.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    @subject.destroy
    respond_to do |format|
      format.html {redirect_to admin_subjects_path}
      format.json do
        if @subject.deleted?
          render json: {message: flash_message("deleted")}
        else
          render json: {message: flash_message("not_deleted")},
            status: :unprocessable_entity
        end
      end
    end
  end

  private
  def subject_params
    params.require(:subject).permit Subject::ATTRIBUTE_PARAMS
  end

  def find_subject
    @subject = Subject.find_by id: params[:id]
    unless @subject
      respond_to do |format|
        format.html {redirect_to admin_subjects_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_course
    if params[:course_id]
      @course = Course.find_by id: params[:course_id]
      unless @course
        respond_to do |format|
          format.html {redirect_to :back}
          format.json do
            render json: {message: flash_message("not_found")},
              status: :not_found
          end
        end
      end
    end
  end

  def find_course_subject
    @user_course = current_user.user_courses.find_by course_id: params[:user_course_id]
    unless @user_course
      respond_to do |format|
        format.html {redirect_to admin_subjects_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
    @course_subject = CourseSubject.where subject_id: params[:id],
      course_id: @user_course.course_id
  end
end
