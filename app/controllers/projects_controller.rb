class ProjectsController < ApplicationController
  before_action :find_project, except: [:index, :create]
  before_action :load_organizations, only: [:index, :show]
  before_action :load_supports
  before_action :authorize_request

  def index
  end

  def create
    @project = Project.new project_params
    respond_to do |format|
      format.html
      format.json do
        if @project.save
          task = create_static_task_project
          render json: {
            project: @project.attributes.merge(task_id: task.id), 
            message: flash_message("created")
          }
        else
          render json: {message: flash_message("not_created")}
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json do
        render json: {
          project: Serializers::Projects::ProjectsSerializer
            .new(object: @project).serializer,
          organization: Serializers::Organizations::OrganizationsSerializer
            .new(object: @organizations).serializer,
          requirements: Serializers::Projects::RequirementsSerializer
            .new(object: @project.requirements).serializer
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
      format.html
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

  def load_supports
    @project_supports = Supports::ProjectSupport.new params: params,
      current_user: current_user
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
    @organizations = Organization.all
  end

  def authorize_request
    authorize_with_multiple page_params.merge(project: @project),
      ProjectPolicy
  end

  def create_static_task_project
    params_project = params[:project]
    static_task = ProjectServices::CreateStaticTaskProject
      .new ownerable_id: params_project[:ownerable_id], project: @project,
      ownerable_type: params_project[:ownerable_type]
    static_task.perform
  end
end
