class Serializers::Tasks::CourseSerializer < Serializers::SupportSerializer
  attrs :id, :name, :training_standard

  def training_standard
    Serializers::Subjects::TrainingStandardSerializer
      .new(object: object.training_standard).serializer
  end
end
