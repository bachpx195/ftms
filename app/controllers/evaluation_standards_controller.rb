class EvaluationStandardsController < ApplicationController
  before_action :find_evaluation_template
  before_action :find_evaluation_standard, except: [:index, :new, :create]
  before_action :authorize_class

  def index
    @evaluation_standards = @evaluation_template.evaluation_standards
  end

  def new
  end

  def create
    @evaluation_standard = @evaluation_template.evaluation_standards
      .build evaluation_standard_params
    respond_to do |format|
      if @evaluation_standard.save
        format.html do
          redirect_to training_standard_evaluation_template_path(@evaluation_template.training_standard)
        end
        format.json{render json: {evaluation_standard: @evaluation_standard}}
      else
        format.html{render :new}
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @evaluation_standard.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def show
  end

  def edit
    respond_to do |format|
      format.html
      format.json{render json: {evaluation_standard: @evaluation_standard}}
    end
  end

  def update
    respond_to do |format|
      if @evaluation_standard.update_attributes evaluation_standard_params
        format.html do
          redirect_to training_standard_evaluation_template_path(@evaluation_template.training_standard)
        end
        format.json{render json: {evaluation_standard: @evaluation_standard}}
      else
        format.html{render :edit}
        format.json do
          render json: {message: flash_message("not_updated"),
            errors: @evaluation_standard.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    @evaluation_standard.destroy
    respond_to do |format|
      format.html do
        redirect_to training_standard_evaluation_template_path(@evaluation_template.training_standard)
      end
      format.json do
        if @evaluation_standard.deleted?
          render json: {message: flash_message("deleted")}
        else
          render json: {message: flash_message("not_deleted")},
            status: :unprocessable_entity
        end
      end
    end
  end

  private
  def evaluation_standard_params
    params.require(:evaluation_standard)
      .permit EvaluationStandard::ATTRIBUTE_PARAMS
  end

  def find_evaluation_template
    @evaluation_template = EvaluationTemplate
      .find_by id: params[:evaluation_template_id]
    unless @evaluation_template
      respond_to do |format|
        format.html{redirect_to root_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_evaluation_standard
    @evaluation_standard = EvaluationStandard.find_by id: params[:id]
    unless @evaluation_standard
      respond_to do |format|
        format.html do
          redirect_to training_standard_evaluation_template_path(@evaluation_template.training_standard)
        end
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
