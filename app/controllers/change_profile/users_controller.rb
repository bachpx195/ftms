class ChangeProfile::UsersController < ApplicationController
  before_action :find_user
  before_action :namespace_authorize

  def show
    @supports = Supports::UserSupport.new
    respond_to do |format|
      format.html
      format.json do
        render json: {
          user_profile: Serializers::ChangeProfile::UserDetailSerializer
            .new(object: @user, scope: {supports: @supports}).serializer
        }
      end
    end
  end

  def update
    respond_to do |format|
      if @user.profile.update_attributes user_params
        format.html{redirect_to @user}
        format.json do
          render json: {message: flash_message("updated"),
            user_profile: @user.profile}
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
  def user_params
    params.require(:profile).permit Profile::CHANGE_PROFILE_PARAMS
  end

  def find_user
    @user = User.find_by id: params[:id]
    unless @user
      respond_to do |format|
        format.html{redirect_to users_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
