class Serializers::Questions::QuestionsSerializer <
  Serializers::SupportSerializer
  attrs :id, :content, :answers
  attrs :results, if: :check_results

  def answers
    Serializers::Questions::AnswersSerializer
      .new(object: object.answers, scope: {correct_answer: correct_answer})
      .serializer
  end

  def results
    Serializers::Questions::ResultsSerializer.new(object: results_)
      .serializer
  end

  private
  def check_results
    question_results.present?
  end

  def results_
    question_results.find_by question_id: object.id if question_results
  end
end
