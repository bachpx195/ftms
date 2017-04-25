class UsersController < ApplicationController
  before_action :load_supports
  before_action :find_organization
  before_action :find_program, only: :new
  before_action :find_user, except: [:index, :new, :create]
  before_action :authorize_request

  def index
    respond_to do |format|
      format.html
      format.json do
        render json: {
          organization: @user_supports.organization_chart
        }
      end
    end
  end

  def new
  end

  def create
    user = UserServices::CreateUser.new(user_params: user_params).perform
    respond_to do |format|
      format.json do
        if user.save
          UserServices::AddRoleUser.new(user: user).perform
          UserServices::CreateUserProgram.new(user: user,
            user_params: user_params[:profile_attributes]).perform
          render json: {message: flash_message("created"),
            user: user}
        else
          render json: {message: flash_message("not_created"),
            errors: user.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json do
        render json: {
          user_detail: @user_supports.user_serializer
        }
      end
    end
  end

  def edit
  end

  def update
    user = @user_supports.user
    respond_to do |format|
      format.json do
        if user.update_attributes user_params
          if user_params[:password] && (user.id == current_user.id)
            sign_in user, bypass: true
          end
          render json: {message: flash_message("updated"),
            user_detail: @user_supports.user_serializer}
        else
          render json: {message: flash_message("not_updated"),
            errors: user.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    respond_to do |format|
      format.json do
        if @user_supports.user.destroy
          render json: {message: flash_message("deleted")}
        else
          render json: {message: flash_message("not_deleted")},
            status: :unprocessable_entity
        end
      end
    end
  end

  private
  def user_params
    params.require(:user).permit User::USER_PROFILE_ATTRIBUTES_PARAMS
  end

  def load_supports
    @user_supports = Supports::UserSupport.new params: params
  end

  def find_user
    unless @user_supports.user
      respond_to do |format|
        format.html{redirect_to root_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_organization
    if params[:organization_id]
      unless @user_supports.organization
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

  def find_program
    if params[:program_id]
      unless @user_supports.program
        respond_to do |format|
          format.html{redirect_to programs_path}
          format.json do
            render json: {message: flash_message("not_found")},
              status: :not_found
          end
        end
      end
    end
  end

  def authorize_request
    authorize_with_multiple page_params.merge(user: @user_supports.user),
      UserPolicy
  end
end
