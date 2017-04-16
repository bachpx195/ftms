class ExamsController < ApplicationController
  before_action :load_supports
  before_action :find_organization
  before_action :authorize_request

  def index
  end

  def show
    ExamServices::CreateResults.new(exam: @exam_supports.exam).perform
  end

  private
  def load_supports
    @exam_supports = Supports::ExamSupport.new params: params,
      user: current_user
  end

  def find_exam
    unless @exam_supports.exam
      respond_to do |format|
        format.html{redirect_to exams_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def find_organization
    if params[:organization_id] && !@exam_supports.organization
      respond_to do |format|
        format.html{redirect_to root_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def authorize_request
    authorize_with_multiple page_params.merge(exam_supports: @exam_supports),
      ExamPolicy
  end
end
