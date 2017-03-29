class UserSubjectsController < ApplicationController
  before_action :find_user_subject

  def update
    respond_to do |format|
      if @user_subject.update_attributes user_subject_params
        format.json do
          render json: {message: flash_message("updated")}
        end
      else
        format.html{render :edit}
        format.json do
          render json: {message: flash_message("not_updated"),
            errors: @user.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  private
  def user_subject_params
    params.require(:user_subject).permit :status
  end

  def find_user_subject
    @user_subject = UserSubject.find_by id: params[:id]
    unless @user_subject
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
