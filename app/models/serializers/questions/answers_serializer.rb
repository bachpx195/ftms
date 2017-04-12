class Serializers::Questions::AnswersSerializer <
  Serializers::SupportSerializer
  attrs :id, :content, :is_correct
end
