class CertificatesController < ApplicationController
  before_action :find_user, only: :show

  def show
    respond_to do |format|
      format.pdf do
        render pdf: "certificate_#{Time.now.strftime('%Y-%m-%d %H:%M:%S')}",
          template: "export_certificate/show.html.erb",
          disposition: "attachment",
          background: true,
          orientation: "Landscape",
          viewport_size: "A4",
          encoding: "UTF-8"
      end
    end
  end

  private
  def find_user
    @user = User.find_by id: params[:user_id]
    unless @user
      respond_to do |format|
        format.html{redirect_to root_path}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end
end
