class MySpace::ExamsController < ApplicationController
  before_action :load_supports
  before_action :authorize_request

  def index
  end

  private
  def load_supports
    @exam_supports = Supports::ExamSupport.new params: params,
      user: current_user
  end

  def authorize_request
    authorize_with_multiple page_params.merge(exam_supports: @exam_supports),
      ExamPolicy
  end
end
