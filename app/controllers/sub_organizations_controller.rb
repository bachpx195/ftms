class SubOrganizationsController < ApplicationController
  before_action :find_organization, only: [:show, :update]

  def show
    @programs_of_org = @organization.programs.not_parent
    respond_to do |format|
      format.html
      format.json
    end
  end

  def update
    respond_to do |format|
      if @organization.update_attributes organization_params
        @message = flash_message "updated"
        format.html {redirect_to @organization}
        format.json
      else
        format.html {render :edit}
        format.json {render json: {message: flash_message("not_updated"),
          errors: @organization.errors}, status: :unprocessable_entity}
      end
    end
  end

  def create
    parent = Organization.find_by id: params[:organization].delete(:parent_id)
    @organization = parent.children.build organization_params.merge(owner: current_user)
    respond_to do |format|
      if @organization.save
        @message = flash_message "created"
        format.html {redirect_to organization_path(id: @organization.id)}
        format.json
      else
        format.html {render :new}
        format.json {render json: {message: flash_message("not_created"),
          errors: @organization.errors}, status: :unprocessable_entity}
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
        format.html {redirect_to organizations_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
