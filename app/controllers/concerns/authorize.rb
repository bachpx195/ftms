module Authorize
  def user_not_authorized
    flash[:alert] = t "flashs.errors.not_authorize"
    redirect_to root_path
  end

  def namespace_authorize query = nil
    check = params[:controller].classify
    klass = "#{check}Policy".constantize
    policy = klass.new(current_user, check)
    query ||= "#{params[:action]}?"

    unless policy.public_send(query)
      error = Pundit::NotAuthorizedError.new("not allowed to #{query} this #{record}")
      raise error
    end
  end

   def authorize_class
    check = params[:controller].classify.constantize
    authorize check
  end
end
