class TeamsController < ApplicationController
  before_action :load_supports
  before_action :find_team, only: :show

  def create
    respond_to do |format|
      format.json do
        team = Team.new team_params
        if team.save
          team.user_subject_ids = params[:user_subject_ids]
          render json: {
            team: Serializers::Teams::CreateTeamsSerializer
              .new(object: team).serializer
          }
        else
          render json: {message: flash_message("not_created"),
            errors: team.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def show
  end

  private
  def team_params
    params.require(:team).permit Team::ATTRIBUTE_PARAMS
  end

  def load_supports
    @team_supports = Supports::TeamSupport.new params: params
  end

  def find_team
    unless @team_supports.team
      respond_to do |format|
        format.html{redirect_to :back}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
