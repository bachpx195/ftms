class Serializers::Teams::CreateTeamsSerializer <
  Serializers::SupportSerializer
  attrs :id, :name, :course_subject_id, :user_subject

  def user_subject
    Serializers::Subjects::UserSubjectsSerializer
      .new(object: object.user_subjects).serializer
  end
end
