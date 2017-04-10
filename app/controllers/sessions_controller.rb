class SessionsController < Devise::SessionsController
  skip_before_action :authenticate_user!, only: [:create, :failure]
  respond_to :json

  def create
    resource = warden.authenticate!(scope: resource_name,
      recall: "#{controller_path}#failure")
    sign_in resource_name, resource
    yield resource if block_given?
    message = t "devise.sessions.signed_in"
    cookies["current_user_id"] = current_user.id

    render json: {success: true, data: {message: message,
      current_user: current_user}}
  end

  def failure
    message = t "devise.failure.invalid", authentication_keys: "email"

    respond_to do |format|
      format.json do
        render json: {success: false,
          data: {message: message, cause: "invalid"}}
      end
      format.html{redirect_to "/users/sessions/new"}
    end
  end
end
