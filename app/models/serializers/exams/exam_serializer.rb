class Serializers::Exams::ExamSerializer < Serializers::SupportSerializer
  attrs :id, :questions
  def questions
    Serializers::Questions::QuestionsSerializer
      .new(object: object.results.questions,
      scope: {question_results: object.results}).serializer
  end
end
