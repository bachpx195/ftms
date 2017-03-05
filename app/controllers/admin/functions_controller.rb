class Admin::FunctionsController < ApplicationController
  before_action :find_function, except: [:index, :new, :create]
  before_action :authorize, except: [:index, :new, :create]
  before_action :authorize_class, only: [:index, :new, :create]
 
  def index
    @functions = Function.select :id, :controller_name, :action, :parent_id,
      :humanize_name
  end

  def new
  end

  def create
    @function = Function.new function_params
    respond_to do |format|
      if @function.save
        format.html {redirect_to [:admin, @function]}
        format.json do
          render json: {message: flash_message("created"),
            function: @function}
        end
      else
        format.html {render :new}
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @function.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def show
  end

  def edit
    respond_to do |format|
      format.html
      format.json {render json: {function: @function}}
    end
  end

  def update
    respond_to do |format|
      if @function.update_attributes function_params
        @message = flash_message "updated"
        format.html{redirect_to [:admin, @function]}
        format.json
      else
        format.html{render :edit}
        format.json{render json: {message: flash_message("not_updated"),
          errors: @function.errors}, status: :unprocessable_entity}
      end
    end
  end

  def destroy
    @function.destroy
    respond_to do |format|
      format.html{redirect_to admin_functions_path}
      format.json do
        if @function.deleted?
          @message = flash_message "deleted"
          @function = Function.all
        else
          render json: {message: flash_message("not_deleted")},
            status: :unprocessable_entity
        end
      end
    end
  end

  private
  def function_params
    params.require(:function).permit Function::ATTRIBUTE_PARAMS
  end

  def find_function
    @function = Funtion.find_by id: params[:id]
    unless @function
      respond_to do |format|
        format.html {redirect_to admin_functions_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def authorize
    admin_authorize @function
  end

  def authorize_class
    admin_authorize Function
  end
end
