class SubjectsController < ApplicationController
  before_action :find_organization, except: :show
  before_action :find_subject, except: [:index, :new, :create]
  before_action :find_course_subject, only: :show
  before_action :authorize_request

  def index
    @subjects = @organization.subjects.select :id, :name, :image, :description,
      :during_time
    @subjects.map{|subject| subject[:image] = {url: subject.image.url}}
    respond_to do |format|
      format.html
      format.json do
        render json: {
          subjects: Serializers::Subjects::SubjectsSerializer
            .new(object: @subjects).serializer
        }
      end
    end
  end

  def create
    @subject = @organization.subjects.build subject_params.merge(creator_id:
      current_user.id)
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
    @course = Course.find_by id: params_course if params_course
    @subject_supports = Supports::SubjectSupport
      .new subject: @subject, course: @course, course_subject: @course_subject,
      current_user: current_user
  end

  def update
    if @subject.update_attributes subject_params
      @subject[:image] = {url: @subject.image.url}
      render json: {message: flash_message("updated"),
        subject: @subject}
    else
      render json: {message: flash_message("not_updated"),
        errors: @subject.errors}, status: :unprocessable_entity
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

  def find_organization
    @organization = Organization.find_by id: params[:organization_id]
    unless @organization
      respond_to do |format|
        format.html{redirect_to organizations_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_subject
    @subject = Subject.find_by id: params[:id]
    unless @subject
      respond_to do |format|
        format.html{redirect_to root_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def authorize_request
    authorize_with_multiple page_params.merge(subject: @subject,
      course_subject: @course_subject, organization: @organization), SubjectPolicy
  end

  def find_course_subject
    params_user_course_id = params[:user_course_id]
    params_course_id = params[:course_id]
    if params_user_course_id || params_course_id
      user_course = current_user.user_courses.find_by id: params_user_course_id
      course_id = user_course ? user_course.course_id : params_course_id
      @course_subject = CourseSubject.find_by subject_id: params[:id],
        course_id: course_id
      unless @course_subject
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
end
