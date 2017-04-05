class OrganizationsController < ApplicationController
  before_action :find_organization, only: [:show, :update, :destroy]
  before_action :authorize_class

  def index
    if current_user.roles.pluck(:name).include? "admin"
      @organizations = Organization.all
    else
      @organizations = current_user.organizations
    end
    respond_to do |format|
      format.html
      format.json do
        render json: {
          organizations: Serializers::Organizations::OrganizationsSerializer
            .new(object: @organizations, scope: {show_program: true}).serializer
        }
      end
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json do
        render json: {
          organization:
            Serializers::Organizations::OrganizationDetailSerializer
              .new(object: @organization).serializer,
          programs:
            Serializers::Organizations::ProgramSerializer
              .new(object: @organization.programs).serializer
        }
      end
    end
  end

  def new
  end

  def create
    @organization = current_user.organizations.build organization_params
    respond_to do |format|
      if @organization.save
        @message = flash_message "created"
        format.html{redirect_to @organization}
        format.json do
          render json: {
            messages: @message,
            organization: Serializers::Organizations::OrganizationsSerializer
              .new(object: @organization, scope: {show_program: false})
              .serializer
          }
        end
      else
        format.html{render :new}
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @organization.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def update
    respond_to do |format|
      if @organization.update_attributes organization_params
        @message = flash_message "updated"
        format.html{redirect_to @organization}
        format.json do
          render json: {
            messages: @message,
            organization: Serializers::Organizations::OrganizationsSerializer
              .new(object: @organization, scope: {show_program: false})
              .serializer
          }
        end
      else
        format.html{render :edit}
        format.json do
          render json: {message: flash_message("not_updated"),
            errors: @organization.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    @organization.destroy
    respond_to do |format|
      format.html{redirect_to organizations_path}
      format.json do
        if @organization.deleted?
          render json: {message: flash_message("deleted")}
        else
          render json: {message: flash_message("not_deleted")},
            status: :unprocessable_entity
        end
      end
    end
  end

  private
  def organization_params
    params.require(:organization).permit Organization::ATTRIBUTES_PARAMS
  end

  def find_organization
    @organization = Organization.find_by id: params[:id]
    unless @organization
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
