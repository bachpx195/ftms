class TrainingStandardsController < ApplicationController
  before_action :load_supports
  before_action :find_training_standard, except: [:index, :new, :create]
  before_action :find_organization
  before_action :authorize_request

  def index
    respond_to do |format|
      format.html
      format.json do
        render json: {
          training_standards: @training_standard_supports
            .training_standards_serializer
        }
      end
    end
  end

  def create
    training_standard = current_user.training_standards
      .build training_standard_params
    respond_to do |format|
      format.json do
        if training_standard.save
          render json: {message: flash_message("created"),
            training_standard: training_standard}
        else
          render json: {message: flash_message("not_created"),
            errors: training_standard.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def show
  end

  def update
    respond_to do |format|
      format.json do
        if @training_standard_supports.training_standard
          .update_attributes training_standard_params
          render json: {message: flash_message("updated"),
            training_standard: @training_standard}
        else
          render json: {message: flash_message("not_updated"),
            errors: @training_standard.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    respond_to do |format|
      format.json do
        if @training_standard_supports.training_standard.destroy
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
    params.require(:training_standard)
      .permit TrainingStandard::ATTRIBUTE_PARAMS
  end

  def load_supports
    @training_standard_supports = Supports::TrainingStandardSupport.
      new params: params
  end

  def find_training_standard
    unless @training_standard_supports.training_standard
      respond_to do |format|
        format.html{redirect_to root_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def authorize_request
    authorize_with_multiple page_params
      .merge(training_standard: @training_standard_supports.training_standard,
        organization: @training_standard_supports.organization),
      TrainingStandardPolicy
  end

  def find_organization
    unless @training_standard_supports.organization
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
