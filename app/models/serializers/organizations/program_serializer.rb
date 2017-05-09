class Serializers::Organizations::ProgramSerializer <
  Serializers::SupportSerializer
  attrs :courses
  attrs :id, :name, :program_type, :user_id, :creator_id
  def courses
    Serializers::Organizations::CoursesSerializer
      .new(object: object.courses).serializer
  end
end
