class SessionsController < Devise::SessionsController
  skip_before_action :authenticate_user!, only: [:create, :failure]
  respond_to :json

  def create
    session["user_auth"] = params[:user]
    resource = warden.authenticate!(scope: resource_name,
      recall: "#{controller_path}#failure")

    sign_in resource_name, resource
    message = t "devise.sessions.signed_in"

    yield resource if block_given?

    return render json: {success: true, login: true, data: {message: message}}
  end

  def failure
    user = User.find_by email: session["user_auth"][:email] rescue nill
    message = t "devise.failure.invalid", authentication_keys: "email"

    respond_to do |format|
      format.json {
        render json: {success: false, data: {message: message, cause: "invalid"}}
      }
      format.html {
        redirect_to "/users/sessions/new"
      }
    end
  end
end
