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
    render json: {message: message, current_user: current_user, 
      profile: current_user.profile, organizations: load_organizations, 
      owner_organization: 1}
  end

  def failure
    message = t "devise.failure.invalid", authentication_keys: "email"

    respond_to do |format|
      format.json do
        render json: {message: message, cause: "invalid"},
          status: :unprocessable_entity
      end
      format.html{redirect_to "/users/sessions/new"}
    end
  end

  private
  def load_organizations
    if current_user.organizations.length == 1
      current_user.organizations.first
    elsif current_user.organizations.length > 1
      current_user.organizations.length
    else
      false
    end
  end
end
