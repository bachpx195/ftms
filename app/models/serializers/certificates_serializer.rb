class Serializers::CertificateSerializer <
  Serializers::BaseSerializer
  attrs :id, :total_point, :training_result

  def training_result
    Serializers::Evaluations::TrainingResultsSerializer
      .new(object: object.training_result).serializer
  end
end
