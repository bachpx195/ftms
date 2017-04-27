class Serializers::Evaluations::EvaluationTemplatesSerializer <
  Serializers::SupportSerializer
  attrs :id, :training_results

  def training_results
    Serializers::Evaluations::TrainingResultsSerializer
      .new(object: object.training_results).serializer
  end
end
