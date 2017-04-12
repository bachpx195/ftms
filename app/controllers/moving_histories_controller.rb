class MovingHistoriesController < ApplicationController
  before_action :load_supports
  before_action :find_organization_moving_histories, only: :index

  def index
    respond_to do |format|
      format.html
      format.json do
        render json: {
          organization_moving_histories:
          @moving_history_support.moving_history_serializer
        }
      end
    end
  end

  private
  def load_supports
    @moving_history_support = Supports::MovingHistorySupport
      .new user_organization_id: current_user.organization_ids
  end

  def find_organization_moving_histories
    unless @moving_history_support.organization_moving_histories
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
