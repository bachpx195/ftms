class Serializers::Programs::CoursesSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :image, :description, :status, :training_standard_id,
    :language_id, :program_id, :start_date, :end_date, :training_standard,
    :members, :course_managers, :subject_count

  def training_standard
    Serializers::TrainingStandards::TrainingStandardsSerializer
      .new(object: object.training_standard).serializer
  end

  def members
    Serializers::Courses::CourseMembersSerializer
      .new(object: object.members).serializer
  end

  def course_managers
    Serializers::Programs::CourseManagersSerializer
      .new(object: object.course_managers).serializer
  end

  def subject_count
    object.subjects.count
  end
end
