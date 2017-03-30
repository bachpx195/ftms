class Serializers::Subjects::CourseSubjectTeamsSerializer <
  Serializers::SupportSerializer
  attr_accessor :id, :name, :course_subject_id
  attr_accessor :user_subjects

  def user_subjects
    Serializers::Subjects::UserSubjectsSerializer
      .new(object: object.user_subjects).serializer
  end
end
