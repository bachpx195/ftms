class Serializers::TestRules::TestRulesQuestionsSerializer <
  Serializers::SupportSerializer
  attrs :id, :question_id, :info

  def info
    Serializers::Categories::QuestionsSerializer
      .new(object: object.question).serializer
  end
end
