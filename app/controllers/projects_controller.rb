class ProjectsController < ApplicationController
  before_action :find_project, except: [:index, :create]
  before_action :load_organizations, only: [:index, :show]

  def index
    @projects = Project.all
    respond_to do |format|
      format.json do
        render json: {
          projects: Serializers::Projects::ProjectsSerializer
            .new(object: @projects)
        }
      end
    end
  end

  def create
    @project = Project.new project_params.merge creator_id: current_user.id
    respond_to do |format|
      format.json do
        if @project.save
          render json: {message: flash_message("created"),
            project: @project}
        else
          render json: {message: flash_message("not_created"),
            errors: @project.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        render json: {
          projects: Serializers::Projects::ProjectsSerializer
            .new(object: @project),
          organization: Serializers::Organizations::OrganizationsSerializer
            .new(object: @organizations)
        }
      end
    end
  end

  def update
    respond_to do |format|
      format.json do
        if @project.update_attributes project_params
          render json: {message: flash_message("updated"),
            project: @project}
        else
          render json: {message: flash_message("not_updated"),
            errors: @project.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    @project.destroy
    respond_to do |format|
      format.json do
        if @project.deleted?
          render json: {message: flash_message("deleted")}
        else
          render json: {message: flash_message("not_deleted")},
            status: :unprocessable_entity
        end
      end
    end
  end

  private
  def project_params
    params.require(:project).permit Project::ATTRIBUTE_PARAMS
  end

  def find_project
    @project = Project.find_by id: params[:id]
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

  def load_organizations
    @organizations = Organization.select :id, :name
  end
end
