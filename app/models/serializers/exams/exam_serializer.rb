class Serializers::Exams::ExamSerializer < Serializers::SupportSerializer
  attrs :id, :questions, :user_show
  def questions
    Serializers::Questions::QuestionsSerializer
      .new(object: object.results.questions,
      scope: {question_results: object.results}).serializer
  end

  def user_show
    object.results.where.not(answer_id: nil).present?
  end
end
