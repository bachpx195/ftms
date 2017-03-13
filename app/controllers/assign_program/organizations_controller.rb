class AssignProgram::OrganizationsController < ApplicationController
  before_action :find_organization
  before_action :find_program, only: :destroy
  before_action :namespace_authorize

  def create
    @organization.assign_programs params[:program_ids]
    respond_to do |format|
      format.html {redirect_to organization_programs_path(@organization)}
      format.json {}
    end
  end

  def destroy
    respond_to do |format|
      if @program.update_attributes organization_id: nil
        format.html {redirect_to organization_programs_path(@organization)}
        format.json {}
      else
        format.html {redirect_to organization_programs_path(@organization)}
        format.json {render json: {}, status: :unprocessable_entity}
      end
    end
  end

  private
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

  def find_program
    @program = @organization.programs.find_by id: params[:program_id]
    unless @program
      respond_to do |format|
        format.html {redirect_to organization_programs_path(@organization)}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
