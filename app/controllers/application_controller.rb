class ApplicationController < ActionController::Base
  include Pundit
  include Authorize
  include ApplicationHelper

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  protect_from_forgery with: :exception

  before_action :authenticate_user!

  protected
  def authenticate_user!
    if user_signed_in?
      super
    else
      redirect_to root_path
    end
  end

  private
  def after_sign_in_path_for resource
    if current_user.is_a? Admin
      admin_root_path
    else
      root_path
    end
  end
end
