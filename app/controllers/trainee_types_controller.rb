class TraineeTypesController < ApplicationController
  before_action :find_trainee_type, except: [:index, :new, :create]

  def index
    @trainee_types = TraineeType.select :id, :name
  end

  def new
  end

  def create
    @trainee_type = TraineeType.new trainee_type_params
    respond_to do |format|
      if @trainee_type.save
        format.html{redirect_to [:admin, @trainee_type]}
        format.json do
          render json: {message: flash_message("created"),
            trainee_type: @trainee_type}
        end
      else
        format.html{render :new}
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @trainee_type.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def show
  end

  def update
    respond_to do |format|
      if @trainee_type.update_attributes trainee_type_params
        format.html{redirect_to [:admin, @trainee_type]}
        format.json do
          render json: {message: flash_message("updated"),
            trainee_type: @trainee_type}
        end
      else
        format.html{render :edit}
        format.json do
          render json: {message: flash_message("not_updated"),
            errors: @trainee_type.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    @trainee_type.destroy
    respond_to do |format|
      format.html{redirect_to admin_trainee_types_path}
      format.json do
        if @trainee_type.deleted?
          render json: {message: flash_message("deleted")}
        else
          render json: {message: flash_message("not_deleted")},
            status: :unprocessable_entity
        end
      end
    end
  end

  private
  def trainee_type_params
    params.require(:trainee_type).permit TraineeType::ATTRIBUTE_PARAMS
  end

  def find_trainee_type
    @trainee_type = TraineeType.find_by id: params[:id]
    unless @trainee_type
      respond_to do |format|
        format.html{redirect_to admin_trainee_types_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
