class StaticPagesController < ApplicationController
  skip_before_action :authenticate_user!

  def show
    @supports = Supports::StaticPage.new user: current_user
    respond_to do |format|
      format.html
      format.json do
        render json: {
          languages: Serializers::StaticPages::StaticPagesSerializer
            .new(object: @supports.languages).serializer,
          courses_size: @supports.courses.size
        }
      end
    end
  end
end
