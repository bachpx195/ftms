class Serializers::Courses::CourseInProgramsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :description, :status, :language_id, :creator_id,
    :program_id, :training_standard_id, :owner_id
end
