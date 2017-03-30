class RequirementsController < ApplicationController
  before_action :find_project
  before_action :find_requirement, except: :create

  def create
    @requirement = @project.requirements.build requirement_params
      .merge creator_id: current_user.id
    if @requirement.save
      render json: {message: flash_message("created"),
        requirement: @requirement}
    else
      render json: {message: flash_message("not_created"),
        errors: @requirement.errors}, status: :unprocessable_entity
    end
  end

  def update
    if @requirement.update_attributes requirement_params
      render json: {message: flash_message("updated"),
        requirement: @requirement}
    else
      render json: {message: flash_message("not_updated"),
        errors: @requirement.errors}, status: :unprocessable_entity
    end
  end

  def destroy
    @requirement.destroy
    if @requirement.deleted?
      render json: {message: flash_message("deleted")}
    else
      render json: {message: flash_message("not_deleted")},
        status: :unprocessable_entity
    end
  end

  private
  def requirement_params
    params.require(:requirement).permit Requirement::ATTRIBUTE_PARAMS
  end

  def find_project
    @project = Project.find_by id: params[:project_id]
    unless @project
      respond_to do |format|
        format.html{redirect_to projects_url}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_requirement
    @requirement = Requirement.find_by id: params[:id]
    unless @requirement
      respond_to do |format|
        format.html{redirect_to @project}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
