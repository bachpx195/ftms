class UserSubjectsController < ApplicationController
  before_action :find_user_subject, :authorize_request, :verify_object

  def update
    user_subject = ChangeStatusServices::UserSubject
      .new(params: user_subject_params, user_subject: @user_subject).perform
    if user_subject
      render json: {message: flash_message("updated"),
        user_subject: user_subject}
    else
      render json: {message: flash_message("not_updated")},
        status: :unprocessable_entity
    end
  end

  private
  def user_subject_params
    params.require(:user_subject).permit :status
  end

  def find_user_subject
    @user_subject = UserSubject.find_by id: params[:id]
    unless @user_subject
      render json: {message: flash_message("not_found")},
        status: :not_found
    end
  end

  def verify_object
    unless @user_subject.course_subject.in_progress?
      return render json: {message: I18n.t("user_subjects.not_update")},
        status: :unprocessable_entity
    end

    unless (@user_subject.in_progress? && status != "init") || @user_subject.init?
      render json: {message: I18n.t("user_subjects.status_fail")},
        status: :unprocessable_entity
    end
  end

  def authorize_request
    authorize_with_multiple page_params.merge(user_subject: @user_subject),
      UserSubjectPolicy
  end
end
