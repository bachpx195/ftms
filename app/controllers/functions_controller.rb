class FunctionsController < ApplicationController
  before_action :find_function, except: [:index, :new, :create]
  before_action :authorize_class, only: [:index, :new, :create]

  def index
    @function_all = Function.select :id, :controller_name, :action, :parent_id,
      :humanize_name
    @functions = Serializers::Roles::FunctionsSerializer
      .new(object: @function_all).serializer
  end

  def create
    @function = Function.new function_params
    respond_to do |format|
      if @function.save
        format.html
        format.json do
          render json: {message: flash_message("created"),
            function: @function}
        end
      else
        format.html
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @function.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def show
  end

  def update
    respond_to do |format|
      if @function.update_attributes function_params
        @message = flash_message "updated"
        format.html
        format.json
      else
        format.html{render :edit}
        format.json do
          render json: {message: flash_message("not_updated"),
            errors: @function.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    @function.destroy
    respond_to do |format|
      format.html
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
    @function = Function.find_by id: params[:id]
    unless @function
      respond_to do |format|
        format.html
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
