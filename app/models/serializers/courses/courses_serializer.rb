class Serializers::Courses::CoursesSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :description, :status, :image, :program_id, :creator,
    :subjects, :program, :managers, :owner, :training_standard, :members

  delegate :creator, to: :object

  def subjects
    Serializers::Subjects::SubjectsSerializer
      .new(object: object.training_standard.subjects).serializer
  end

  def program
    Serializers::Programs::ProgramsSerializer
      .new(object: object.program).serializer
  end

  def managers
    object.managers.uniq
  end

  delegate :owner, to: :object

  def members
    Serializers::Courses::CourseMembersSerializer
      .new(object: object.members.uniq).serializer
  end

  def training_standard
    Serializers::TrainingStandards::TrainingStandardsSerializer
      .new(object: object.training_standard).serializer
  end
end
