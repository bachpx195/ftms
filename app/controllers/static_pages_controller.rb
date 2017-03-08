class StaticPagesController < ApplicationController
  skip_before_action :authenticate_user!

  def show
    respond_to do |format|
      format.html
      format.json do
        @supports = Supports::StaticPage.new
      end
    end
  end
end
