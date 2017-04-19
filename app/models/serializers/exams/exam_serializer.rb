class Serializers::Exams::ExamSerializer < Serializers::SupportSerializer
  attrs :id, :questions, :user_show
  def questions
    Serializers::Questions::QuestionsSerializer
      .new(object: object.results.questions,
      scope: {question_results: object.results,
      correct_answer: correct_answer?}).serializer
  end

  def user_show
    object.results.where.not(answer_id: nil).present?
  end

  private
  def correct_answer?
    object.results.check_answer
  end
end
