class Clone::TrainingStandardsController < ApplicationController
  def create
    clone_training_standard =
      TrainingStandardServices::CloneTrainingStandard
        .new training_standard_id: params[:training_standard_id],
        organization_id: params[:organization_id]
    if cloned_item = clone_training_standard.clone
      render json: {training_standard: cloned_item}
    else
      render json: {message: flash_message("not_created"),
        errors: @dynamic_task.errors}, status: :unprocessable_entity
    end
  end
end
