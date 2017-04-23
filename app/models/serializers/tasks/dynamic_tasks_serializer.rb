class Serializers::Tasks::DynamicTasksSerializer <
  Serializers::SupportSerializer
  attrs :id, :status, :ownerable_id, :ownerable_type, :targetable_id,
    :targetable_type, :user_id, :meta_tasks

  def meta_tasks
    Serializers::Tasks::MetaTasksSerializer
      .new(object: object.meta_tasks).serializer
  end
end
