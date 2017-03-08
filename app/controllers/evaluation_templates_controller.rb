class EvaluationTemplatesController < ApplicationController
  before_action :find_training_standard
  before_action :find_evaluation_template, except: [:index, :new, :create]
  before_action :authorize_class

  def index
    @evaluation_template = @training_standard.evaluation_template
  end

  def new
  end

  def create
    @evaluation_template = if params[:evaluation_template][:parent_id].present?
      parent = @training_standard.evaluation_templates
        .find_by id: params[:evaluation_template].delete[:parent_id]
      parent.children.build evaluation_template_params.merge(training_standard: @training_standard)
    else
      @training_standard.evaluation_templates.build evaluation_template_params
    end

    respond_to do |format|
      if @evaluation_template.save
        format.html{redirect_to  @training_standard, @evaluation_template}
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
        format.html{redirect_to @training_standard, @evaluation_template}
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
      format.html{redirect_to training_standard_evaluation_templates_path}
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
    params.require(:evaluation_template).permit evaluation_template::ATTRIBUTE_PARAMS
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
    @evaluation_template = @training_standard.evaluation_templates.find_by id: params[:id]
    unless @evaluation_template
      respond_to do |format|
        format.html {redirect_to training_standard_evaluation_templates_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
