class UsersController < ApplicationController
  before_action :find_user, except: [:index, :new, :create]
  before_action :authorize, except: [:index, :new, :create]
  before_action :authorize_class, only: [:index, :new, :create]

  def index
    @users = User.all
  end

  def new
  end

  def create
    @user = User.new user_params
    respond_to do |format|
      if @user.save
        format.html {redirect_to @user}
        format.json do
          render json: {message: flash_message("created"),
            user: @user}
        end
      else
        format.html {render :new}
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @user.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def show
  end

  def edit
    respond_to do |format|
      format.html
      format.json {render json: {user: @user}}
    end
  end

  def update
    respond_to do |format|
      if @user.update_attributes user_params
        format.html {redirect_to @user}
        format.json do
          render json: {message: flash_message("updated"),
            user: @user}
        end
      else
        format.html {render :edit}
        format.json do
          render json: {message: flash_message("not_updated"),
            errors: @user.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    @user.destroy
    respond_to do |format|
      format.html {redirect_to users_path}
      format.json do
        if @user.deleted?
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
    params.require(:user).permit :name, :email, :avatar, :password, :password_confirmation
  end

  def find_user
    @user = User.find_by id: params[:id]
    unless @user
      respond_to do |format|
        format.html {redirect_to users_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def authorize
    admin_authorize @user
  end

  def authorize_class
    admin_authorize User
  end
end
