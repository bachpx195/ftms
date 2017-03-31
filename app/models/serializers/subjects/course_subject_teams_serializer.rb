class Serializers::Subjects::CourseSubjectTeamsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :course_subject_id, :user_subjects

  def user_subjects
    Serializers::Subjects::UserSubjectsSerializer
      .new(object: object.user_subjects).serializer
  end
end
