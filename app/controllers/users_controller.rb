class UsersController < ApplicationController
  before_action :load_supports
  before_action :find_user, except: [:index, :create]
  before_action :authorize_class
  before_action :find_organization, only: :index

  def index
    respond_to do |format|
      format.html
      format.json do
        render json: {
          users: @user_supports.users_serializer
        }
      end
    end
  end

  def create
    user = User.new user_params
    respond_to do |format|
      format.json do
        if user.save
          user.roles << Role.find(6)
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

  def update
    user = @user_supports.user
    respond_to do |format|
      format.json do
        if user.update_attributes user_params
          render json: {message: flash_message("updated"),
            user: user}
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
    params.require(:user)
      .permit :name, :email, :avatar, :password, :password_confirmation
  end

  def load_supports
    @user_supports = Supports::UserSupport.new params: params
  end

  def find_user
    unless @user_supports.user
      respond_to do |format|
        format.html{redirect_to users_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_organization
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
