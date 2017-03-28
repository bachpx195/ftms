class TeamsController < ApplicationController
  before_action :find_course_subject

  def create
    @team = @course_subject.teams.build team_params
    respond_to do |format|
      if @team.save
        @team.user_subject_ids = params[:user_subject_ids]
        format.html{redirect_to :back}
        format.json
      else
        format.html{render :new}
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @team.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  private
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

  def team_params
    params.require(:team).permit Team::ATTRIBUTE_PARAMS
  end
end
