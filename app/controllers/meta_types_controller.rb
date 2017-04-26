class MetaTypesController < ApplicationController
  before_action :find_subject, only: :create
  before_action :policy, only: :create

  def create
    @meta_type = @subject.organization.meta_types.build meta_type_params
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
    params.require(:meta_type).permit :name, :organization_id
  end

  def find_subject
    @subject = Subject.find_by id: params[:subject_id]
    unless @subject
      respond_to do |format|
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def policy
    policy = @subject.organization.managers.include? current_user
    unless policy
      respond_to do |format|
        format.json do
          render json: {message: I18n.t("subjects.permit_create_meta_types_fails")},
            status: :not_found
        end
      end
    end
  end
end
