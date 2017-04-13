class Serializers::Questions::QuestionsSerializer <
  Serializers::SupportSerializer
  attrs :id, :content, :answers

  def answers
    Serializers::Questions::AnswersSerializer
      .new(object: object.answers).serializer
  end
end
