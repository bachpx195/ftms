class Serializers::Evaluations::EvaluationStandardsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :min_point, :max_point, :average_point
end
