class Clone::TrainingStandardsController < ApplicationController
  before_action :authorize_request, only: :create

  def create
    clone_training_standard =
      TrainingStandardServices::CloneTrainingStandard
        .new clone_params
    if cloned_item = clone_training_standard.clone
      render json: {training_standard: cloned_item}
    else
      render json: {message: flash_message("not_created"),
        errors: @dynamic_task.errors}, status: :unprocessable_entity
    end
  end

  private
  def clone_params
    params.require(:clone).permit :organization_id, :training_standard_id
  end

  def authorize_request
    find_data
    authorize_with_multiple page_params.merge(organization: @organization,
      training_standard: @training_standard),
      Clone::TrainingStandardPolicy
  end

  def find_data
    @training_standard = TrainingStandard.find_by id:
      params[:clone][:training_standard_id]
    @organization = Organization.find_by id:
      params[:clone][:organization_id]
    unless @organization && @training_standard
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
