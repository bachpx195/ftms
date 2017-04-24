class Serializers::Tasks::CourseSubjectSerializer < Serializers::SupportSerializer
  attrs :id, :course, :subject, :training_standard

  def course
    Serializers::Tasks::CourseSerializer.new(object: object.course)
      .serializer
  end

  def subject
    Serializers::Tasks::SubjectSerializer
      .new(object: object.subject).serializer
  end
end
