class MemberEvaluationsController < ApplicationController
  before_action :find_target
  before_action :find_member_evaluation, only: [:update]

  def create
    @member_evaluation = @target.member_evaluations
      .build member_evaluation_params.merge(manager_id: current_user.id)
    respond_to do |format|
      format.json do
        if @member_evaluation.save
          render json: {message: flash_message("created"),
            member_evaluation: @member_evaluation,
            member_evaluation_items: @member_evaluation.member_evaluation_items}
        else
          render json: {message: flash_message("not_created"),
            errors: @member_evaluation.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def update
    respond_to do |format|
      format.json do
        if @member_evaluation.update_attributes member_evaluation_params
          render json: {message: flash_message("updated"),
            member_evaluation: @member_evaluation,
            member_evaluation_items: @member_evaluation.member_evaluation_items}
        else
          render json: {message: flash_message("not_updated"),
            errors: @member_evaluation.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  private
  def member_evaluation_params
    params.require(:member_evaluation).permit MemberEvaluation::ATTRIBUTE_PARAMS
  end

  def find_target
    @target =
      if params[:subject_id]
        CourseSubject.find_by course_id: params[:course_id],
          subject_id: params[:subject_id]
      else
        Course.find_by id: params[:course_id]
      end

    unless @target
      respond_to do |format|
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_member_evaluation
    @member_evaluation = @target.member_evaluations.find_by id: params[:id]
    unless @member_evaluation
      respond_to do |format|
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
