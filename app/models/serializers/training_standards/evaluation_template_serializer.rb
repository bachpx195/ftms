class Serializers::TrainingStandards::EvaluationTemplateSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :training_standard_id, :evaluation_standards,
    :training_results

  def evaluation_standards
    Serializers::TrainingStandards::EvaluationStandardsSerializer
      .new(object: object.evaluation_standards).serializer
  end

  def training_results
    Serializers::TrainingStandards::TrainingResultsSerializer
      .new(object: object.training_results).serializer
  end
end
