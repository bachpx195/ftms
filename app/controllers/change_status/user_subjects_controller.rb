class ChangeStatus::UserSubjectsController < ApplicationController
  before_action :find_object, :verify_object, :authorize_request, only: :update

  def update
    user_subjects = ChangeStatusServices::ChangeStatuses
      .new(course_subject: @course_subject,
        params: params, user_subjects: @object.user_subjects).perform
    if user_subjects
      render json: {message: flash_message("updated"),
        user_subjects: Serializers::Subjects::UserSubjectsSerializer
          .new(object: user_subjects).serializer}
    else
      render json: {message: flash_message("not_updated")},
        status: :unprocessable_entity
    end
  end

  private
  def user_subject_params
    params.require(:user_subject).permit :status
  end

  def find_object
    @course_subject = CourseSubject.find_by id: params[:course_subject_id]
    @object = params[:object_type].constantize
      .find_by id: params[:object_id]

    unless @object || @course_subject
      render json: {message: flash_message("not_found")},
        status: :not_found
    end
  end

  def verify_object
    status = user_subject_params[:status]
    object_type = params[:object_type]
    statuses = CourseSubject.statuses

    if object_type == "CourseSubject"
      if statuses[@course_subject.status] > statuses[status]
        render json: {message: I18n.t("user_subjects.status_fail")},
          status: :unprocessable_entity
      end
    elsif object_type == "Team"
      if statuses[@course_subject.status] >= statuses["finished"]
        render json: {message: I18n.t("user_subjects.not_update")},
          status: :unprocessable_entity
      end
    end
  end

  def authorize_request
    authorize_with_multiple page_params.merge(
      object: @object, course_subject: @course_subject),
      UpdateUserSubject::UserSubjectPolicy
  end
end
