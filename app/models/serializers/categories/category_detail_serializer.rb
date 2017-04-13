class Serializers::Categories::CategoryDetailSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :description, :creator_id, :questions

  def questions
    Serializers::Questions::QuestionsSerializer
      .new(object: object.questions).serializer
  end
end
