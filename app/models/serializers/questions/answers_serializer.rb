class Serializers::Questions::AnswersSerializer <
  Serializers::SupportSerializer
  attrs :id, :content
  attrs :is_correct, if: :is_correct?

  private
  def is_correct?
    correct_answer
  end
end
