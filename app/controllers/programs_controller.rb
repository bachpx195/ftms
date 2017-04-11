class ProgramsController < ApplicationController
  before_action :find_organization
  before_action :find_program, except: [:index, :new, :create]
  before_action :authorize_request

  def index
    @programs = []
    @organization.programs.each do |program|
      @programs << program
      @programs += load_sub_programs(program)
    end
    @not_assigned_programs = Program.not_assigned_programs
    respond_to do |format|
      format.html
      format.json do
        render json: {
          programs: Serializers::Programs::ProgramsSerializer
            .new(object: @programs).serializer,
          not_assigned_programs: Serializers::Programs::ProgramsSerializer
            .new(object: @not_assigned_programs).serializer
        }
      end
    end
  end

  def new
  end

  def create
    @program =
      if params[:program][:parent_id].present?
        parent = Program.find_by id: params[:program].delete(:parent_id)
        parent.children.build program_params
      else
        @organization.programs.build program_params.merge(creator_id:
          current_user.id)
      end

    respond_to do |format|
      if @program.save
        format.html{redirect_to [:admin, @program]}
        format.json do
          render json: {
            program: Serializers::Programs::ProgramsSerializer
              .new(object: @program).serializer
          }
        end
      else
        format.html{render :new}
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @program.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def show
    @supports = Supports::ProgramSupport.new program: @program,
      role_id: params[:role_id]
    respond_to do |format|
      format.html
      format.json do
        render json: {
          program_detail: Serializers::Programs::ProgramDetailSerializer
            .new(object: @program, scope: {supports: @supports}).serializer,
          owners: Serializers::Users::UsersSerializer
            .new(object: @supports.owners).serializer,
          all_roles: Serializers::Roles::RolesSerializer
            .new(object: @supports.all_roles).serializer
        }
      end
    end
  end

  def update
    respond_to do |format|
      if @program.update_attributes program_params
        format.html{redirect_to @program}
        format.json do
          render json: {
            program: Serializers::Programs::ProgramsSerializer
              .new(object: @program).serializer
          }
        end
      else
        format.html{render :edit}
        format.json do
          render json: {message: flash_message("not_updated"),
            errors: @program.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    @program.destroy
    respond_to do |format|
      format.html{redirect_to programs_path}
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
        format.html{redirect_to organizations_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_program
    @program = Program.find_by id: params[:id]
    unless @program
      respond_to do |format|
        format.html{redirect_to :back}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def load_sub_programs program
    programs = Array.new
    program.children.each do |sub_program|
      programs << sub_program
      programs += load_sub_programs(sub_program)
    end
    programs
  end

  def authorize_request
    authorize_with_multiple page_params.merge(organization: @organization,
      function: @function, program: @program), ProgramPolicy
  end
end
