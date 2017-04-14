class Serializers::Categories::QuestionsSerializer <
  Serializers::SupportSerializer
  attrs :id, :content, :level, :category

  def category
    Serializers::Categories::CategoriesSerializer
      .new(object: object.category).serializer
  end
end
