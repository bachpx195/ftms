class CategoriesController < ApplicationController
  before_action :load_supports
  before_action :find_category, only: [:update, :destroy, :show]
  before_action :authorize_request

  def index
  end

  def create
    category = Category.new category_params.merge(creator_id: current_user.id)
    respond_to do |format|
      format.json do
        if category.save
          render json: {
            category: Serializers::Categories::CategoriesSerializer
              .new(object: category).serializer
          }
        else
          render json: {message: flash_message("not_created"),
            errors: category.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def show
  end

  def update
    category = @category_supports.category
    respond_to do |format|
      format.json do
        if category.update_attributes category_params
          render json: {
            message: flash_message("updated"),
            category: Serializers::Categories::CategoriesSerializer
              .new(object: category).serializer
          }
        else
          render json: {message: flash_message("not_updated"),
            errors: category.errors}, status: :unprocessable_entity
        end
      end
    end
  end

  def destroy
    respond_to do |format|
      format.json do
        category = @category_supports.category
        if category.destroy
          render json: {message: flash_message("deleted"),
            category: category}
        else
          render json: {message: flash_message("not_deleted")},
            status: :unprocessable_entity
        end
      end
    end
  end

  private
  def category_params
    params.require(:category).permit Category::ATTRIBUTE_PARAMS
  end

  def load_supports
    @category_supports = Supports::CategorySupport.new params: params
  end

  def find_category
    unless @category_supports.category
      respond_to do |format|
        format.html{redirect_to categories_url}
        format.json do
          render json: {message: flash_message("not_found")},
            status: :not_found
        end
      end
    end
  end

  def authorize_request
    authorize_with_multiple page_params
      .merge(category_supports: @category_supports), CategoryPolicy
  end
end
