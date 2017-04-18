class StatisticsController < ApplicationController
  before_action :load_statistic
  before_action :find_organization
  # before_action :authorize_request

  def show
    template = "statistics/#{params[:type]}"
    if template_exists? template
      render template
    else
      raise ActionController::RoutingError.new "Not Found"
    end
  end

  def create
    respond_to do |format|
      format.js
    end
  end

  private
  def load_statistic
    @statistics = "Supports::Statistics::#{params[:type].classify}Support"
      .constantize.new current_user: current_user,
      	organization_id: params[:organization_id]
  end

  def find_organization
    if params.has_key?(:organization_id) && @statistics.organization.nil?
      respond_to do |format|
        format.html{redirect_to organizations_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
