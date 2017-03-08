module Authorize
  def user_not_authorized
    flash[:alert] = t "flashs.errors.not_authorize"
    redirect_to root_path
  end

  def admin_authorize record, query = nil
    klass = "Admin::#{record.model_name}Policy".constantize
    policy = klass.new(current_user, record)
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
