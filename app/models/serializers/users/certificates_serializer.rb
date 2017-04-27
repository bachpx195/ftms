class Serializers::Users::CertificatesSerializer <
  Serializers::SupportSerializer
  attrs :id, :course_id, :program, :training_result, :training_standard,
    :creator, :created_at

  def program
    Serializers::Certificates::ProgramSerializer
      .new(object: object.program).serializer
  end

  def training_result
    Serializers::Certificates::TrainingResultSerializer
      .new(object: object.training_result).serializer
  end

  def creator
    Serializers::Certificates::CreatorSerializer
      .new(object: object.creator).serializer
  end

  def training_standard
    Serializers::Certificates::TrainingStandardSerializer
      .new(object: object.training_standard).serializer
  end
end
