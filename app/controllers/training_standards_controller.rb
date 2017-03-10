class TrainingStandardsController < ApplicationController
  before_action :find_training_standard, except: [:index, :new, :create]

  def index
    @standard_organizations = current_user.training_standards
  end

  def new
  end

  def create
    @standard_organization = current_user.training_standards.
      build training_standard_params
    respond_to do |format|
      if @standard_organization.save
        format.html {redirect_to @training_standard}
        format.json do
          render json: {message: flash_message("created"),
            standard_organization: @standard_organization}
        end
      else
        format.html {render :new}
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @standard_organization.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def show
  end

  def edit
    respond_to do |format|
      format.html
      format.json {render json: {standard_organization: @standard_organization}}
    end
  end

  def update
    respond_to do |format|
      if @standard_organization.update_attributes training_standard_params
        format.html {redirect_to @standard_organizationi}
        format.json do
          render json: {message: flash_message("updated"),
            standard_organization: @standard_organization}
        end
      else
        format.html {render :edit}
        format.json do
          render json: {message: flash_message("not_updated"),
            errors: @standard_organization.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    @standard_organization.destroy
    respond_to do |format|
      format.html {redirect_to admin_training_standards_path}
      format.json do
        if @standard_organization.deleted?
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
    params.require(:standard_organization).permit TrainingStandard::ATTRIBUTE_PARAMS
  end

  def find_training_standard
    @standard_organization = TrainingStandard.find_by id: params[:id]
    unless @standard_organization
      respond_to do |format|
        format.html {redirect_to root_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
