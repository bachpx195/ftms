class Supports::CategorySupport
  def initialize args = {}
    @params = args[:params]
  end

  def category
    @category ||= Category.find_by id: @params[:id]
  end

  def categories_serializer
    Serializers::Categories::CategoriesSerializer
      .new(object: Category.all).serializer
  end
end
