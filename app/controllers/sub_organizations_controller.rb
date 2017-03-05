class SubOrganizationsController < ApplicationController
  before_action :find_organization, only: [:show]

  def show
    @programs_of_org = @organization.programs.not_parent
    respond_to do |format|
      format.html
      format.json
    end
  end

  private
  def find_organization
    @organization = Organization.find_by id: params[:id]
    unless @organization
      respond_to do |format|
        format.html {redirect_to admin_organizations_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
