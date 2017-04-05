class MovingHistoriesController < ApplicationController
  before_action :find_organization_moving_hitories, only: :index

  def index
    respond_to do |format|
      format.html
      format.json do
        render json: {
          organization_moving_histories:
            Serializers::MovingHistories::MovingHistoriesSerializer
              .new(object: @organization_moving_histories).serializer
        }
      end
    end
  end

  private
  def find_organization_moving_hitories
    @organization_moving_histories = MovingHistory
      .where organization_id: current_user.profile.organization_id
    unless @organization_moving_histories
      respond_to do |format|
        format.html{redirect_to moving_histories_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
