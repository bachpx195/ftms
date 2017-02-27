class Admin::TrainingStandardsController < ApplicationController
  before_action :find_training_standard, except: [:index, :new, :create]
  before_action :authorize, except: [:index, :new, :create]
  before_action :authorize_class, only: [:index, :new, :create]

  def index
    @training_standards = TrainingStandard.select :id, :name, :description
  end

  def new
  end

  def create
    @training_standard = TrainingStandard.new training_standard_params
    respond_to do |format|
      if @training_standard.save
        format.html {redirect_to [:admin, @training_standard]}
        format.json do
          render json: {message: flash_message("created"),
            training_standard: @training_standard}
        end
      else
        format.html {render :new}
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @training_standard.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def show
  end

  def edit
    respond_to do |format|
      format.html
      format.json {render json: {training_standard: @training_standard}}
    end
  end

  def update
    respond_to do |format|
      if @training_standard.update_attributes training_standard_params
        format.html {redirect_to [:admin, @training_standard]}
        format.json do
          render json: {message: flash_message("updated"),
            training_standard: @training_standard}
        end
      else
        format.html {render :edit}
        format.json do
          render json: {message: flash_message("not_updated"),
            errors: @training_standard.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    @training_standard.destroy
    respond_to do |format|
      format.html {redirect_to admin_training_standards_path}
      format.json do
        if @training_standard.deleted?
          render json: {message: flash_message("deleted")}
        else
          render json: {message: flash_message("not_deleted")},
            status: :unprocessable_entity
        end
      end
    end
  end

  private
  def training_standard_params
    params.require(:training_standard).permit :name, :description, :program_id
  end

  def find_training_standard
    @training_standard = TrainingStandard.find_by id: params[:id]
    unless @training_standard
      respond_to do |format|
        format.html {redirect_to admin_program_training_standards_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def authorize
    admin_authorize @training_standard
  end

  def authorize_class
    admin_authorize TrainingStandard
  end
end
