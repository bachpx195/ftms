class TimelinesController < ApplicationController
  before_action :load_supports

  def index
  end

  private
  def load_supports
    @timeline_supports = Supports::TimelineSupport.new user: current_user
  end
end
