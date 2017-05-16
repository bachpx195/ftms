class TeamsController < ApplicationController
  before_action :load_supports
  before_action :find_team, only: :show
  before_action :authorize_request

  def create
    respond_to do |format|
      format.json do
        team = Team.new team_params
        if team.save
          team.user_subject_ids = params[:user_subject_ids]
          TeamServices::CreateStaticTask.new(team: team,
            course_subject: @team_supports.course_subject).perform
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
        format.html{redirect_to root_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def authorize_request
    authorize_with_multiple page_params.merge(team: @team_supports.team,
      course: @team_supports.course), TeamPolicy
  end
end
