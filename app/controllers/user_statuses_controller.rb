class UserStatusesController < ApplicationController
  def create
    user_status = UserStatus.new user_status_params
    respond_to do |format|
      format.json do
        if user_status.save
          render json: {message: flash_message("created"),
            user_status: user_status}
        else
          render json: {message: flash_message("not_created"),
            errors: user_status.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  private
  def user_status_params
    params.require(:user_status).permit UserStatus::ATTRIBUTE_PARAMS
  end
end
