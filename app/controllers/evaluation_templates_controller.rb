class EvaluationTemplatesController < ApplicationController
  before_action :find_training_standard
  before_action :find_evaluation_template, only: [:update, :destroy]
  before_action :authorize_class

  def new
  end

  def create
    @evaluation_template = EvaluationTemplate.new evaluation_template_params
      .merge(training_standard_id: @training_standard.id)

    respond_to do |format|
      if @evaluation_template.save
        format.html{redirect_to @training_standard, @evaluation_template}
        format.json{render json: {message: flash_message("created"),
          evaluation_template: @evaluation_template}}
      else
        format.html{render :new}
        format.json{render json: {message: flash_message("not_created"),
          errors: @evaluation_template.errors}, status: :unprocessable_entity}
      end
    end
  end

  def show
    @evaluation_standards = if @training_standard.evaluation_template
      @training_standard.evaluation_template.evaluation_standards
    else
      []
    end
  end

  def edit
    respond_to do |format|
      format.html
      format.json {render json: {evaluation_template: @evaluation_template}}
    end
  end

  def update
    respond_to do |format|
      if @evaluation_template.update_attributes evaluation_template_params
        format.html{redirect_to training_standard_evaluation_template_path(@training_standard)}
        format.json{render json: {message: flash_message("updated"),
          evaluation_template: @evaluation_template}}
      else
        format.html{render :edit}
        format.json{ render json: {message: flash_message("not_updated"),
          errors: @evaluation_template.errors}, status: :unprocessable_entity}
      end
    end
  end

  def destroy
    @evaluation_template.destroy
    respond_to do |format|
      format.html{redirect_to training_standard_evaluation_template_path(@training_standard)}
      format.json do
        if @evaluation_template.deleted?
          render json: {message: flash_message("deleted")}
        else
          render json: {message: flash_message("not_deleted")},
            status: :unprocessable_entity
        end
      end
    end
  end

  private
  def evaluation_template_params
    params.require(:evaluation_template).permit EvaluationTemplate::ATTRIBUTE_PARAMS
  end

  def find_training_standard
    @training_standard = TrainingStandard.find_by id: params[:training_standard_id]
    unless @training_standard
      respond_to do |format|
        format.html {redirect_to training_standards_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_evaluation_template
    @evaluation_template = @training_standard.evaluation_template
    unless @evaluation_template
      respond_to do |format|
        format.html {redirect_to training_standard_evaluation_template_path(@training_standard)}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
