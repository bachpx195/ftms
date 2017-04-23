class MetaTypesController < ApplicationController
  def create
    @meta_type = current_user.meta_types.build meta_type_params
    respond_to do |format|
      if @meta_type.save
        format.json {render json: {meta_type: @meta_type}}
      else
        format.json {render json: {error: @meta_type.error}}
      end
    end
  end

  private

  def meta_type_params
    params.require(:meta_type).permit :name, :user_id
  end
end
