class Serializers::Organizations::ProgramSerializer <
  Serializers::SupportSerializer
  attrs :courses
  attrs :id, :name, :program_type
  def courses
    Serializers::Organizations::CoursesSerializer
      .new(object: object.courses).serializer
  end
end
