class StaticPagesController < ApplicationController
  skip_before_filter :authenticate_user!

  def show
    if current_user.present?
      if current_user.is_a? Admin
        redirect_to admin_root_path
      end
    end
    respond_to do |format|
      format.html
      format.json do
        @supports = Supports::StaticPage.new
      end
    end
  end
end
