class ProgramsController < ApplicationController
  before_action :find_organization
  before_action :find_program, except: [:index, :new, :create]

  def show
    @supports = Supports::Program.new @program
  end

  private
  def find_organization
    @organization = Organization.find_by id: params[:organization_id]
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

  def find_program
    @program = @organization.programs.find_by id: params[:id]
    unless @program
      respond_to do |format|
        format.html {redirect_to admin_programs_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
