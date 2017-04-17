class ShareWithsController < ApplicationController

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
end
