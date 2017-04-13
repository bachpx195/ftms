class ExamsController < ApplicationController
  before_action :load_supports

  def index
  end

  private
  def load_supports
    @exam_supports = Supports::ExamSupport.new params: params,
      user: current_user
  end
end
