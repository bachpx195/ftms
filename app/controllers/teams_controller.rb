class TeamsController < ApplicationController
  before_action :find_course_subject
  before_action :find_team, only: :show

  def create
    @team = @course_subject.teams.build team_params
    if @team.save
      @team.user_subject_ids = params[:user_subject_ids]
    else
      render json: {message: flash_message("not_created"),
        errors: @team.errors}, status: :unprocessable_entity
    end
  end

  def show
    @team_supports = Supports::TeamSupport
      .new course_subject: @course_subject, team: @team
  end

  private
  def team_params
    params.require(:team).permit Team::ATTRIBUTE_PARAMS
  end

  def find_course_subject
    @course_subject = CourseSubject.find_by id: params[:course_subject_id]
    unless @course_subject
      respond_to do |format|
        format.html{redirect_to :back}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_team
    @team = @course_subject.teams.find_by id: params[:id]
    unless @team
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
