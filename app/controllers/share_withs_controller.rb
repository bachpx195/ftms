class ShareWithsController < ApplicationController
  before_action :authorize_request, only: :create

  def create
    @share_with = ShareWith.new share_withs_params
    respond_to do |format|
      if @share_with.save
        format.html{redirect_to root_path}
        format.json do
          render json: {message: flash_message("created"),
            share_with: @share_with}
        end
      else
        format.html{render :new}
        format.json do
          render json: {message: flash_message("not_created"),
            errors: @share_with.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  private
  def share_withs_params
    params.require(:share_with).permit :organization_id, :training_standard_id
  end

  def authorize_request
    find_data
    authorize_with_multiple page_params.merge(organization: @organization,
      training_standard: @training_standard), ShareWithPolicy
  end

  def find_data
    @training_standard = TrainingStandard.find_by id:
      params[:share_with][:training_standard_id]
    @organization = @training_standard.organization
    unless @organization
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
