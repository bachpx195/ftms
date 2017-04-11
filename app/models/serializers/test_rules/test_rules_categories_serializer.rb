class Serializers::TestRules::TestRulesCategoriesSerializer <
  Serializers::SupportSerializer
  attrs :id, :number_question, :easy, :normal, :hard, :info

  def info
    Serializers::Categories::CategoriesSerializer
      .new(object: object.category).serializer
  end
end
