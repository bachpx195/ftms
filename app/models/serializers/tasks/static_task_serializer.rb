class Serializers::Tasks::StaticTaskSerializer < Serializers::SupportSerializer
  attrs :id, :course_subject, :meta_tasks

  def course_subject
    Serializers::Tasks::CourseSubjectSerializer.new(object: object.ownerable)
      .serializer
  end

  def meta_tasks
    Serializers::Tasks::MetaTaskSerializer
      .new(object: object.meta_tasks.order_desc).serializer
  end
end
