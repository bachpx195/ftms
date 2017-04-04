class Serializers::Organizations::ProgramSerializer <
  Serializers::SupportSerializer
  attrs :training_standards, :courses
  attrs :id, :name, :program_type
  def courses
    Serializers::Organizations::CoursesSerializer
      .new(object: object.courses).serializer
  end

  def training_standards
    Serializers::TrainingStandards::TrainingStandardsSerializer
      .new(object: object.training_standards).serializer
  end
end
