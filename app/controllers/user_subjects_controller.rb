class UserSubjectsController < ApplicationController
  before_action :find_user_subject

  def update
    @user_subject.attributes = params_with_date
    if @user_subject.save
      render json: {message: flash_message("updated"),
        user_subject: @user_subject}
    else
      render json: {message: flash_message("not_updated"),
        errors: @user.errors}, status: :unprocessable_entity
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

  def params_with_date
    status_param = user_subject_params[:status]
    if !@user_subject.in_progress? && status_param == "in_progress"
      user_subject_params.merge start_date: Date.today,
        end_date: Date.today + @user_subject.subject.during_time.days
    elsif !@user_subject.finished? && status_param == "finished"
      user_subject_params.merge user_end_date: Date.today
    elsif status_param == "init"
      user_subject_params.merge start_date: nil, end_date: nil,
        user_end_date: nil
    else
      user_subject_params
    end
  end
end
