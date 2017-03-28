module Authorize
  def user_not_authorized
    flash[:alert] = t "flashs.errors.not_authorize"
    redirect_to root_path
  end

  def namespace_authorize query = ""
    klass = params[:controller].classify
    if Settings.class_names.include? klass
      klass = class_eval "#{klass}Policy"
      policy = klass.new current_user, check
      query ||= "#{params[:action]}?"

      unless policy.public_send(query = "")
        error = Pundit::NotAuthorizedError.new "not allowed to #{query} this
          #{record}"
        raise error
      end
    else
      raise "Forbidden"
    end
  end

   def authorize_class
    klass = params[:controller].classify
    if Settings.class_names.include? klass
      klass = class_eval klass
      authorize klass
    else
      raise "Forbidden"
    end
  end
end
