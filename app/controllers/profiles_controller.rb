class ProfilesController < ApplicationController
  before_action :find_user, only: :show

  def show
    respond_to do |format|
      format.json do
        render json: {
          profile: Serializers::Profiles::ProfileSerializer
            .new(object: @user).serializer
        }
      end
    end
  end

  private
  def find_user
    @user = User.find_by id: params[:id]
    unless @user
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
