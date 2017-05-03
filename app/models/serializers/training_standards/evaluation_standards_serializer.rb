class Serializers::TrainingStandards::EvaluationStandardsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :min_point, :max_point, :obligatory
end
