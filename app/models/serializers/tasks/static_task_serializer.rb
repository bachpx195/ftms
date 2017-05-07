class Serializers::Tasks::StaticTaskSerializer < Serializers::SupportSerializer
  attrs :id, :name, :course_subject, :dynamic_tasks, :type

  def name
    object.targetable.name
  end

  def course_subject
    Serializers::Tasks::CourseSubjectSerializer.new(object: object.ownerable)
      .serializer
  end

  def dynamic_tasks
    Serializers::Tasks::DynamicTasksSerializer
      .new(object: object.dynamic_tasks).serializer
  end

  def type
    object.targetable.class.name
  end
end
