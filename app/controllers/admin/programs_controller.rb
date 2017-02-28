class Admin::ProgramsController < ApplicationController
  before_action :find_organization
  before_action :find_program, except: [:index, :new, :create]
  before_action :authorize, except: [:index, :new, :create]
  before_action :authorize_class, only: [:index, :new, :create]

  def index
    @programs = @organization.programs
  end

  def new
  end

  def create
    @program = if params[:program][:parent_id].present?
      parent = @organization.programs
        .find_by id: params[:program].delete(:parent_id)
      parent.children.build program_params.merge(organization: @organization)
    else
      @organization.programs.build program_params
    end

    respond_to do |format|
      if @program.save
        format.html {redirect_to [:admin, @program]}
        format.json
      else
        format.html {render :new}
        format.json {render json: {message: flash_message("not_created"),
          errors: @program.errors}, status: :unprocessable_entity}
      end
    end
  end

  def show
    @supports = Supports::Program.new @program
  end

  def edit
    respond_to do |format|
      format.html
      format.json {render json: {program: @program}}
    end
  end

  def update
    respond_to do |format|
      if @program.update_attributes program_params
        format.html {redirect_to [:admin, @program]}
        format.json
      else
        format.html {render :edit}
        format.json {render json: {message: flash_message("not_updated"),
          errors: @program.errors}, status: :unprocessable_entity}
      end
    end
  end

  def destroy
    @program.destroy
    respond_to do |format|
      format.html {redirect_to admin_programs_path}
      format.json do
        if @program.deleted?
          @message = flash_message "deleted"
          @programs = @organization.programs
        else
          render json: {message: flash_message("not_deleted")},
            status: :unprocessable_entity
        end
      end
    end
  end

  private
  def program_params
    params.require(:program).permit Program::ATTRIBUTE_PARAMS
  end

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

  def authorize
    admin_authorize @program
  end

  def authorize_class
    admin_authorize Program
  end
end
