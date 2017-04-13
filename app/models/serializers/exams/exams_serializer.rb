class Serializers::Exams::ExamsSerializer < Serializers::SupportSerializer
  attrs :id, :subject, :course, :created_at, :spent_time, :score, :user

  def subject
    Serializers::Subjects::SubjectsSerializer
      .new(object: object.course_subject.subject).serializer
  end

  def course
    Serializers::Exams::CourseSerializer
      .new(object: object.course || object.course_subject.course).serializer
  end

  def user
    Serializers::Exams::UserSerializer.new(object: object.user).serializer
  end
end
